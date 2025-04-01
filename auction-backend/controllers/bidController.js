// controllers/bidController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create a new bid
export const createBid = async (req, res) => {
    try {
        const { productId, amount } = req.body;
        const buyerId = req.user.id;
        
        // Check if product exists and auction is ongoing
        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: { auction: true }
        });
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        if (!product.auction || product.auction.status !== 'ONGOING') {
            return res.status(400).json({ message: 'Auction is not active' });
        }
        
        const now = new Date();
        if (now > new Date(product.auction.endTime)) {
            return res.status(400).json({ message: 'Auction has ended' });
        }
        
        // Create bid
        const bid = await prisma.bid.create({
            data: {
                amount: parseFloat(amount),
                status: 'PENDING',
                buyer: { connect: { id: buyerId } },
                product: { connect: { id: productId } },
                auction: { connect: { id: product.auction.id } }
            },
            include: {
                buyer: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        
        res.status(201).json(bid);
    } catch (error) {
        console.error('Error creating bid:', error);
        res.status(500).json({ message: 'Failed to create bid', error: error.message });
    }
};

// Get all bids for a buyer
export const getBuyerBids = async (req, res) => {
    try {
        const buyerId = req.user.id;
        
        const bids = await prisma.bid.findMany({
            where: { buyerId },
            include: {
                product: {
                    include: {
                        auction: true,
                        seller: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        
        res.json(bids);
    } catch (error) {
        console.error('Error fetching buyer bids:', error);
        res.status(500).json({ message: 'Failed to fetch bids', error: error.message });
    }
};

// Accept a bid
export const acceptBid = async (req, res) => {
    try {
        const { id } = req.params;
        const sellerId = req.user.id;
        
        // Get the bid with product info
        const bid = await prisma.bid.findUnique({
            where: { id },
            include: {
                product: true,
                auction: true
            }
        });
        
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }
        
        // Check if user is the seller of the product
        const product = await prisma.product.findUnique({
            where: { id: bid.productId }
        });
        
        if (product.sellerId !== sellerId) {
            return res.status(403).json({ message: 'Unauthorized. You are not the seller of this product.' });
        }
        
        // Start transaction to update bid status and auction status
        const result = await prisma.$transaction(async (prisma) => {
            // Update the accepted bid
            const updatedBid = await prisma.bid.update({
                where: { id },
                data: { status: 'ACCEPTED' }
            });
            
            // Reject all other bids for this product
            await prisma.bid.updateMany({
                where: {
                    productId: bid.productId,
                    id: { not: id }
                },
                data: { status: 'REJECTED' }
            });
            
            // Mark auction as completed
            await prisma.auction.update({
                where: { id: bid.auction.id },
                data: { status: 'COMPLETED' }
            });
            
            return updatedBid;
        });
        
        res.json({ message: 'Bid accepted successfully', bid: result });
    } catch (error) {
        console.error('Error accepting bid:', error);
        res.status(500).json({ message: 'Failed to accept bid', error: error.message });
    }
};

// Reject a bid
export const rejectBid = async (req, res) => {
    try {
        const { id } = req.params;
        const sellerId = req.user.id;
        
        // Get the bid with product info
        const bid = await prisma.bid.findUnique({
            where: { id },
            include: { product: true }
        });
        
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }
        
        // Check if user is the seller of the product
        const product = await prisma.product.findUnique({
            where: { id: bid.productId }
        });
        
        if (product.sellerId !== sellerId) {
            return res.status(403).json({ message: 'Unauthorized. You are not the seller of this product.' });
        }
        
        // Update the bid status
        const updatedBid = await prisma.bid.update({
            where: { id },
            data: { status: 'REJECTED' }
        });
        
        res.json({ message: 'Bid rejected successfully', bid: updatedBid });
    } catch (error) {
        console.error('Error rejecting bid:', error);
        res.status(500).json({ message: 'Failed to reject bid', error: error.message });
    }
};