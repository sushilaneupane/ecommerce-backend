import pool from '../../config/db.js';

class CartRepository {
  async getAllCarts() {
    const [rows] = await pool.execute('SELECT * FROM carts');
    return rows;
  }

  async getCartById(id) {
    const [rows] = await pool.execute('SELECT * FROM carts WHERE id = ?', [id]);
    return rows[0];
  }

  async createCart(quantity, userId, productId) {
    const [result] = await pool.execute(
      'INSERT INTO carts (quantity, userId, productId) VALUES (?, ?, ?)',
      [quantity, userId, productId]
    );
    return { id: result.insertId, quantity, userId, productId };
  }

  async updateCart(id, quantity, userId, productId) {
    const [result] = await pool.execute(
      'UPDATE carts SET quantity = ?, userId = ?, productId = ? WHERE id = ?',
      [quantity, userId, productId, id]
    );

    if (result.affectedRows === 0) throw new Error('cart not found');
    return { id, quantity, userId, productId };
  }

  async deleteCart(id) {
    const [result] = await pool.execute('DELETE FROM carts WHERE id = ?', [id]);

    if (result.affectedRows === 0) throw new Error('cart  not found');
    return { message: 'user deleted successfully' };
  }
}


export default CartRepository;
