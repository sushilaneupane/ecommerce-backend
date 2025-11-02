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

  async createPayments(orderId, paymentMethod, transactionId, totalAmount) {
    const [result] = await pool.execute(
      'INSERT INTO payments (orderId, paymentMethod, transactionId, amount) VALUES (?, ?, ?, ?)',
      [orderId, paymentMethod, transactionId, totalAmount]
    );
    return { id: result.insertId, orderId, paymentMethod, transactionId, totalAmount };
  }

  async removeCartItemByProductId(userId, productId) {
    const [result] = await pool.execute(
      'DELETE FROM carts WHERE userId = ? AND productId = ?',
      [userId, productId]
    );
    return result.affectedRows > 0;
  }

  async getOrderHistory(userId) {
    try {
      const [orders] = await pool.execute(`
SELECT 
    o.id AS orderId,
    o.userId,
    o.totalAmount,
    o.shippingCost,
    o.orderStatus,
    o.addressId,
    o.createdAt,
    o.updatedAt,
    COUNT(oi.id) AS totalItems,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'productId', p.id,
            'productName', p.name,
            'quantity', oi.quantity,
            'price', oi.price,
            'subtotal', oi.subtotal
        )
    ) AS products,
    (
      SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
              'paymentId', pay.id,
              'paymentMethod', pay.paymentMethod,
              'transactionId', pay.transactionId,
              'amount', pay.amount,
              'paymentStatus', pay.paymentStatus,
              'createdAt', pay.createdAt
          )
      )
      FROM payments pay
      WHERE pay.orderId = o.id
    ) AS payments
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.orderId
LEFT JOIN products p ON oi.productId = p.id
WHERE o.userId = ?
GROUP BY o.id
ORDER BY o.createdAt DESC;
        `,
        [userId]
      );

      return orders;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch order history');
    }
  }
  async updateOrderStatus(orderStatus, orderId) {
    const [result] = await pool.execute(
      'UPDATE orders SET orderStatus = ? WHERE id = ?',
      [orderStatus, orderId]
    );
    return result.affectedRows > 0;
  };
  async getAllOrders() {
    const [orders] = await pool.execute(
      'SELECT orders.*, users.firstName, users.lastName FROM orders INNER JOIN users ON orders.userId = users.id'
    );
    return orders;
  }
  getTotalOrders = async () => {
  try {
    const [result] = await pool.query("SELECT COUNT(*) AS total FROM orders");
    return result[0].total;
  } catch (error) {
    throw new Error("Error counting orders");
  }
}


};
export default OrdersRepository;
