import express from 'express';
import OrdersController from './orders.controller.js';
import checkAdminRole from '../middleware/check-admin.js';

const router = express.Router();
const ordersController = new OrdersController();


router.post('/', ordersController.createOrders);
router.get('/total', checkAdminRole, ordersController.getTotalOrders);
    
router.get('/user/:userId', ordersController.getOrdersByUser);

router.put('/:orderId', checkAdminRole, ordersController.updateOrderStatus);
router.get('/', checkAdminRole, ordersController.getAllOrders);
export default router;
