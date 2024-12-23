import pool from '../../config/db.js';

class WishlistRepository {
  async getAllWishlist() {
    const [rows] = await pool.execute('SELECT * FROM wishlist');
    return rows;
  }

  async getWishlistById(id) {
    const [rows] = await pool.execute('SELECT * FROM wishlist WHERE id = ?', [id]);
    return rows[0];
  }

  async createWishlist( userId, productId) {
    const [result] = await pool.execute(
      'INSERT INTO wishlist ( userId, productId) VALUES (?, ?)',
      [ userId, productId]
    );
    return { id: result.insertId,  userId, productId };
  }

  async updateWishlist(id, userId, productId) {
    const [result] = await pool.execute(
      'UPDATE wishlist SET userId = ?, productId = ? WHERE id = ?',
      [ userId, productId, id]
    );
    if (result.affectedRows === 0) throw new Error('Wishlist not found');
    return { id, userId, productId };
  }

  async deleteWishlist(id) {
    const [result] = await pool.execute('DELETE FROM wishlist WHERE id = ?', [id]);

    if (result.affectedRows === 0) throw new Error('Wishlist not found');
    return { message: 'Wishlist deleted successfully' };
  }
}

export default WishlistRepository;
