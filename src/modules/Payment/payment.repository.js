import pool from '../../config/db.js';

class paymentRepository {

  async getAllPayments() {
    const [payments] = await pool.execute(
      'SELECT payments.*, orders.id AS orderId, orders.totalAmount FROM payments INNER JOIN orders ON payments.orderId = orders.id'
    );
    return payments;
  }
  async updatePaymentStatus(paymentStatus, paymentId) {
    const [result] = await pool.execute(
      'UPDATE payments SET paymentStatus = ? WHERE id = ?',
      [paymentStatus, paymentId]
    );
    return result.affectedRows > 0;
  };
}

export default paymentRepository;
