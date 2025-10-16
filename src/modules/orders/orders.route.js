import express from 'express';
import OrdersController from './orders.controller.js';
import checkAdminRole from '../middleware/check-admin.js';

const router = express.Router();
const ordersController = new OrdersController();

// Create order
router.post('/', ordersController.createOrders);

// Get orders by user
router.get('/user/:userId', ordersController.getOrdersByUser);

export default router;
