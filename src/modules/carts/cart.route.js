import express from 'express';
import CartController from './cart.controller.js'; 

const router = express.Router();

const cartController = new CartController(); 


router.get('/', cartController. getAllCarts);
router.get('/:id', cartController.getCartById);
router.post('/', cartController.createCart);
router.put('/:id', cartController.updateCart);
router.delete('/:id', cartController.deleteCart);

export default router;
