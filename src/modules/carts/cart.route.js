import express from 'express';
import CartController from './cart.controller.js'; 
import checkAdminRole from '../middleware/check-admin.js';
import verifyToken from '../middleware/verify-token.js';

const router = express.Router();

const cartController = new CartController(); 


router.get('/',verifyToken, cartController. getAllCarts);
router.get('/:id',verifyToken, cartController.getCartById);
router.post('/',verifyToken, cartController.createCart);
router.put('/:id',verifyToken, cartController.updateCart);
router.delete('/:id',verifyToken, cartController.deleteCart);

export default router;
