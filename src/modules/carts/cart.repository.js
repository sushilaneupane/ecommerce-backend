import pool from '../../config/db.js';

class CartRepository {
  async getAllCarts() {
    const [rows] = await pool.execute(  `SELECT 
      carts.id, 
      users.firstName, users.lastName, users.email, users.phone, 
      products.name AS productName, products.price,
      categories.name AS categoryName, categories.description AS categoryDescription
     FROM carts
     INNER JOIN users ON carts.userId = users.id
     INNER JOIN products ON carts.productId = products.id
     INNER JOIN categories ON products.categoryId = categories.id`,  
  );
    return rows;
  }

  async getCartById(id) {
    const [rows] = await pool.execute(  `SELECT 
            carts.id, 
            users.firstName, users.lastName, users.email, users.phone, 
            products.name AS productName, products.price,
            categories.name AS categoryName, categories.description AS categoryDescription
           FROM carts
           INNER JOIN users ON carts.userId = users.id
           INNER JOIN products ON carts.productId = products.id
           INNER JOIN categories ON products.categoryId = categories.id
           WHERE carts.id = ?`, 
          [id]
        );
    return rows[0];
  }

  async getCartsByUserId(userId) {
    try {
      const [rows] = await pool.execute(`
        SELECT 
          carts.id, 
          users.firstName, 
          users.lastName, 
          users.email, 
          users.phone, 
          users.id, 
          quantity,
          products.name AS productName, 
          products.price,
          categories.name AS categoryName, 
          categories.description AS categoryDescription
        FROM carts
        INNER JOIN users ON carts.userId = users.id
        INNER JOIN products ON carts.productId = products.id
        INNER JOIN categories ON products.categoryId = categories.id
        WHERE users.id = ?`, 
        [userId]
      );
      return rows;
    } catch (error) {
      throw new Error(`Database query failed: ${error.message}`);
    }
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
