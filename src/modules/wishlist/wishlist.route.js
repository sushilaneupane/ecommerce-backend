import express from 'express';

import WishlistController from './wishlist.controller.js';
import verifyToken from '../middleware/verify-token.js';

const router = express.Router();
const wishlistController = new WishlistController();

router.get('/', verifyToken, wishlistController.getAllWishlist);
router.get('/:id', verifyToken,  wishlistController.getWishlistById);
router.post('/', verifyToken, wishlistController.createWishlist);
router.put('/:id', verifyToken, wishlistController.updateWishlist);
router.delete('/:id', verifyToken, wishlistController.deleteWishlist);
router.get('/user/:userId',verifyToken,  wishlistController.getWishlistByUserId);

export default router;
