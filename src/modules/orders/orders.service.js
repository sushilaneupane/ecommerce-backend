import OrdersRepository from './orders.repository.js';
import CartRepository from '../carts/cart.repository.js';

class OrdersService {
  constructor() {
    this.ordersRepository = new OrdersRepository();
    this.cartRepository = new CartRepository();
  }

  async createOrders(userId, shippingCost, totalAmount, addressId, products, transactionId, paymentMethod) {
    try {
      const orders = await this.ordersRepository.createOrders(userId, shippingCost, totalAmount, addressId);
      const orderId = orders.id;

      await this.ordersRepository.createPayments(orderId, paymentMethod, transactionId, totalAmount);

      for (const product of products) {
        await this.ordersRepository.createOrderItem(orderId, product.productId, product.quantity, product.price);
        await this.ordersRepository.removeCartItemByProductId(userId, product.productId);
      }

      return orders;
    } catch (error) {
      throw new Error('Error creating Order: ' + error.message);
    }
  }

  async getOrdersByUser(userId) {
    try {
      const orders = await this.ordersRepository.getOrderHistory(userId);
      return orders;
    } catch (error) {
      throw new Error('Error fetching orders: ' + error.message);
    }
  }
  async updateOrderStatus(orderStatus, orderId) {
    try {
      const result = await this.ordersRepository.updateOrderStatus(orderStatus, orderId);
      console.log(result, "result");
      
      return result;
    } catch (error) {
      throw new Error('Error updating order status: ' + error.message);
    }   
  }
  async getAllOrders() {
    try {
      return await this.ordersRepository.getAllOrders();
    } catch (error) {
      throw new Error('Error fetching orders: ' + error.message);
    }
  }
}

export default OrdersService;
