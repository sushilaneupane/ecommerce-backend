import pool from '../../config/db.js';

class WishlistRepository {
  async getAllWishlist() {
    const [rows] = await pool.execute(`SELECT 
            wishlist.id, 
            users.firstName, users.lastName, users.email, users.phone, 
            products.name AS productName, products.price,
            categories.name AS categoryName, categories.description AS categoryDescription
           FROM wishlist
           INNER JOIN users ON wishlist.userId = users.id
           INNER JOIN products ON wishlist.productId = products.id
           INNER JOIN categories ON products.categoryId = categories.id`, 
          );
    return rows;
  }

  async getWishlistById(Id) {
    const [rows] = await pool.execute(
          `SELECT 
            wishlist.id, 
            users.firstName, users.lastName, users.email, users.phone, 
            products.name AS productName, products.price,
            categories.name AS categoryName, categories.description AS categoryDescription
           FROM wishlist
           INNER JOIN users ON wishlist.userId = users.id
           INNER JOIN products ON wishlist.productId = products.id
           INNER JOIN categories ON products.categoryId = categories.id
           WHERE wishlist.id = ?`, 
          [Id]
        );
    
    if (rows.length === 0) throw new Error('Wishlist not found');
    return rows[0];
      }

  async getWishlistByUserId(userId) {
    const [rows] = await pool.execute('SELECT * FROM wishlist WHERE userId = ?', [userId]);

    if (rows.length === 0) throw new Error('No wishlist found for this user');
    return rows;
  }

  async createWishlist(userId, productId) {
    const [result] = await pool.execute(
      'INSERT INTO wishlist (userId, productId) VALUES (?, ?)',
      [userId, productId]
    );

    return { Id: result.insertId, userId, productId };
  }

   async checkIfExists(userId, productId){
    const [result] = await pool.execute(
    'SELECT * FROM wishlist WHERE userId = ? AND productId = ?',
    [userId, productId]
    );
    return result;
   }


  async updateWishlist(wishlistId, userId, productId) {
    const [result] = await pool.execute(
      'UPDATE wishlist SET userId = ?, productId = ? WHERE Id = ?',
      [userId, productId, wishlistId]
    );

    if (result.affectedRows === 0) throw new Error('Wishlist not found');
    return { Id: wishlistId, userId, productId };
  }

  async deleteWishlist(wishlistId) {
    const [result] = await pool.execute('DELETE FROM wishlist WHERE Id = ?', [wishlistId]);

    if (result.affectedRows === 0) throw new Error('Wishlist not found');
    return { message: 'Wishlist deleted successfully' };
  }
}

export default WishlistRepository;
