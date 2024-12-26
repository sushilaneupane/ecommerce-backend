import express from 'express';

import WishlistController from './wishlist.controller.js';

const router = express.Router();
const wishlistController = new WishlistController();

router.get('/', wishlistController.getAllWishlist);
router.get('/:id', wishlistController.getWishlistById);
router.post('/', wishlistController.createWishlist);
router.put('/:id', wishlistController.updateWishlist);
router.delete('/:id',wishlistController.deleteWishlist);
router.get('/user/:userId', wishlistController.getWishlistByUserId);

export default router;
