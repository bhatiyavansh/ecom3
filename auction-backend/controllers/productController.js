// controllers/productController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create a new product with auction
export const createProduct = async (req, res) => {
    try {
        const { name, description, quantity, price, auction } = req.body;
        const sellerId = req.user.id; // Get user ID from auth middleware
        
        // Create product and auction in a transaction
        const result = await prisma.$transaction(async (prisma) => {
            // Create the product first
            const product = await prisma.product.create({
                data: {
                    name,
                    description,
                    quantity: parseInt(quantity),
                    price: parseFloat(price),
                    seller: {
                        connect: { id: sellerId }
                    }
                }
            });
            
            // Then create the auction
            const newAuction = await prisma.auction.create({
                data: {
                    startTime: new Date(auction.startTime),
                    endTime: new Date(auction.endTime),
                    status: auction.status,
                    product: {
                        connect: { id: product.id }
                    }
                }
            });
            
            // Return product with auction
            return await prisma.product.findUnique({
                where: { id: product.id },
                include: {
                    auction: true
                }
            });
        });
        
        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
};

// Get all products for a specific seller with auctions and bids
export const getSellerProducts = async (req, res) => {
    try {
        const sellerId = req.user.id; // Get user ID from auth middleware
        
        const products = await prisma.product.findMany({
            where: {
                sellerId
            },
            include: {
                auction: true,
                bids: {
                    include: {
                        buyer: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        
        res.json(products);
    } catch (error) {
        console.error('Error fetching seller products:', error);
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};

// Get all active products (for buyers)
export const getAllProducts = async (req, res) => {
    try {
        const now = new Date();
        
        const products = await prisma.product.findMany({
            where: {
                auction: {
                    status: 'ONGOING',
                    endTime: {
                        gt: now
                    }
                }
            },
            include: {
                seller: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                auction: true,
                bids: {
                    select: {
                        id: true,
                        amount: true
                    }
                }
            }
        });
        
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};

// Get product by ID with bids
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                auction: true,
                bids: {
                    include: {
                        buyer: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    },
                    orderBy: {
                        amount: 'desc'
                    }
                },
                seller: {
                    select: {
                        id: true,
                        name: true,
                        phone: true,
                        address: true
                    }
                }
            }
        });
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Failed to fetch product', error: error.message });
    }
};