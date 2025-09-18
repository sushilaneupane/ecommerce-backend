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
        console.log(userId);
        
        const [rows] = await pool.execute(
          `SELECT 
            wishlist.id, 
            users.id AS userId,
            users.firstName, users.lastName, users.email, users.phone, 
            products.id AS productId,
            products.description,
            products.name AS productName, products.price,
            categories.name AS categoryName, categories.description AS categoryDescription,
            product_image.image AS imageUrl
           FROM wishlist
           INNER JOIN users ON wishlist.userId = users.id
           INNER JOIN products ON wishlist.productId = products.id
           INNER JOIN categories ON products.categoryId = categories.id
           INNER JOIN product_image ON product_image.productId = products.id
           WHERE users.id = ?`,
          [userId]
        );
      
        if (rows.length === 0) throw new Error('No wishlist found for this user');
      
        const wishlistMap = {};
      
        rows.forEach(row => {
          const key = row.id;
          if (!wishlistMap[key]) {
            wishlistMap[key] = {
              wishlistId: row.id,
              userId: row.userId,
              firstName: row.firstName,
              lastName: row.lastName,
              email: row.email,
              phone: row.phone,
              productId: row.productId,
              productName: row.productName,
              price: row.price,
              categoryName: row.categoryName,
              categoryDescription: row.categoryDescription,
              description: row.description,
              images: []
            };
          }
          wishlistMap[key].images.push(row.imageUrl);
        });
      
        return Object.values(wishlistMap);
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
    return result[0];
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
