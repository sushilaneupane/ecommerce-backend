
import CartRepository from './cart.repository.js';

class CartService {
  constructor() {
    this.cartRepository = new CartRepository();
  }

  async getAllCartss() {
    try {
      return await this.cartRepository.getAllCarts();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartsByUserId(userId) {
    try {
      return await this.cartRepository.getCartsByUserId(userId);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(id) {
    try {
      const cart = await this.cartRepository.getCartById(id);
      if (!cart) {
        throw new Error('Cart not found');
      }
      return cart;
    } catch (error) {
      throw new Error('Error fetching cart: ' + error.message);
    }
  }

  async createCart(quantity, userId, productId) {
    try {
      return await this.cartRepository.createCart(quantity, userId, productId);
    } catch (error) {
      throw new Error('Error creating cart: ' + error.message);
    }
  }
  
  async updateCart(id, quantity, userId, productId) {
    try {      
      return await this.cartRepository.updateCart(id, quantity, userId, productId);
    } catch (error) {
      throw new Error('Error updating cart: ' + error.message);
    }
  }

  async deleteCart(id) {
    try {
      return await this.cartRepository.deleteCart(id);
    } catch (error) {
      throw new Error('Error deleting cart: ' + error.message);
    }
  }
}

export default CartService;
