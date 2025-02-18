import pool from '../../config/db.js';

class OrdersRepository {


  async createOrders(userId, shippingCost, totalAmount, addressId) {    
    const [result] = await pool.execute(
      'INSERT INTO Orders (userId, shippingCost, totalAmount, addressId) VALUES (?, ?, ?, ?)',
      [userId, shippingCost, totalAmount, addressId]
    );
    return { id: result.insertId, userId, shippingCost, totalAmount, addressId };
}

  async createOrderItem(orderId, productId, quantity, price) {
    const [result] = await pool.execute(
      'INSERT INTO order_items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)',
      [orderId, productId, quantity, price]
    );
    
    return { id: result.insertId, orderId, productId, quantity, price };
  }


async createPayments( orderId, paymentMethod, transactionId,amount ){
const [result] = await pool.execute(
  'INSERT INTO payments (orderId, PaymentMethod, transactionId, amount) VALUES (?, ?, ?, ?)',
  [orderId, paymentMethod, transactionId, amount]
)
return {id: result.insertId, orderId, paymentMethod, transactionId, amount};
}
}
export default OrdersRepository;
