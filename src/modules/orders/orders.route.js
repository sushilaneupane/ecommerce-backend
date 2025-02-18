import express from 'express';
import OrdersController from './orders.controller.js';
import checkAdminRole from '../middleware/check-admin.js'

const router = express.Router();
const ordersController = new OrdersController();

router.post('/', ordersController.createOrders);

export default router;
