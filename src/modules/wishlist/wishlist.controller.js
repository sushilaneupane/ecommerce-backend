import WishlistService from './wishlist.service.js';


class WishlistController {
  constructor() {
    this.wishlistService = new WishlistService();
  }

  getAllWishlist = async (req, res) => {
    try {
      const wishlist = await this.wishlistService.getAllWishlist();
      res.status(200).json(wishlist);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
    }
  };

  getWishlistById = async (req, res) => {
    const { id } = req.params;
    try {
      const wishlist = await this.wishlistService.getWishlistById(id);
      res.status(200).json(wishlist);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
    }
  };

  getWishlistByUserId = async (req, res) => {
    const {userId } = req.params;
    try {
      const wishlistByUserId = await this.wishlistService.getWishlistByUserId(userId);
      res.status(200).json( wishlistByUserId);
    } catch (error) {
      res.status(400).json(error.message );
    }
  };  
  


  createWishlist = async (req, res) => {
    const { userId, productId } = req.body;
    try {
      const newWishlist = await this.wishlistService.createWishlist( userId, productId);
      res.status(201).json(newWishlist);
    } catch (error) {
      res.status(500).json({ message: 'Error creating wishlist', error: error.message });
    }
  };

  updateWishlist = async (req, res) => {
    const { id } = req.params;
    const {userId, productId} = req.body;
    try {
      const updatedWishlist = await this.wishlistService.updateWishlist(id,  userId, productId);
      res.status(200).json(updatedWishlist);
    } catch (error) {
      res.status(500).json({ message: 'Error updating wishlist', error: error.message });
    }
  };

  deleteWishlist = async (req, res) => {
    const { id } = req.params;
      const result = await this.wishlistService.deleteWishlist(id);
      res.status(200).json(result);
  };
}

export default WishlistController;
