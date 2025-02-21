import OrdersRepository from './orders.repository.js';

class OrdersService {
  constructor() {
    this.ordersRepository = new OrdersRepository();
  }
  async createOrders(userId, shippingCost, totalAmount, addressId, products, transactionId, paymentMethod) {
    try {
      const orders = await this.ordersRepository.createOrders(userId, shippingCost, totalAmount, addressId);
        const orderId = orders.id; 
       
        await this.ordersRepository.createPayments(orderId, paymentMethod, transactionId, totalAmount);

        for (const product of products) {
            await this.ordersRepository.createOrderItem(orderId, product.productId, product.quantity, product.price);
        }

        return orders;
    } catch (error) {
        throw new Error('Error creating Order: ' + error.message);
    }
}

}

export default OrdersService;
