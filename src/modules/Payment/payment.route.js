import express from 'express';
import paymentController from './payment.controller.js';
import checkAdminRole from '../middleware/check-admin.js';

const router = express.Router();
const paymentCtrl = new paymentController();

router.get('/', checkAdminRole, paymentCtrl.getAllPayments);
router.put('/:paymentId',  checkAdminRole, paymentCtrl.updatePayment);


export default router;
