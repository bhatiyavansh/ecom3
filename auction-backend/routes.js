// routes.js
import express from 'express';
import * as productController from './controllers/productController.js';
import * as bidController from './controllers/bidController.js';
import authMiddleware from './authMiddleware.js';

const router = express.Router();

// Product routes
router.post('/api/products', authMiddleware, productController.createProduct);
router.get('/api/products/seller', authMiddleware, productController.getSellerProducts);
router.get('/api/products', productController.getAllProducts);
router.get('/api/products/:id', productController.getProductById);

// Bid routes
router.post('/api/bids', authMiddleware, bidController.createBid);
router.get('/api/bids/buyer', authMiddleware, bidController.getBuyerBids);
router.patch('/api/bids/:id/accept', authMiddleware, bidController.acceptBid);
router.patch('/api/bids/:id/reject', authMiddleware, bidController.rejectBid);

export default router;