import pool from '../../config/db.js';

class ProductRepository {
  getAllProducts = async () => {
    const [rows] = await pool.execute(
      `SELECT 
        products.id, 
        products.name AS productName, 
        products.price, 
        categories.name AS categoryName, 
        categories.description AS categoryDescription
       FROM products
       INNER JOIN categories ON products.categoryId = categories.id`, 
    );
    return rows;
  };

  getProductById = async (id) => {
    const [rows] = await pool.execute(
      `SELECT 
        products.id, 
        products.name AS productName, 
        products.price, 
        categories.name AS categoryName, 
        categories.description AS categoryDescription
       FROM products
       INNER JOIN categories ON products.categoryId = categories.id
       WHERE products.id = ?`, 
      [id]
    );

    return rows[0]; 
};

  getProductsByCategoryId = async (categoryId) => {
    const [rows] = await pool.execute('SELECT * FROM products WHERE categoryId = ?', [categoryId]);
    return rows;
  };

  createProduct = async (name, description, price, categoryId) => {
    const [result] = await pool.execute(
      'INSERT INTO products (name, description, price, categoryId) VALUES (?, ?, ?, ?)',
      [name, description, price, categoryId]
    );
    return { id: result.insertId, name, description, price, categoryId };
  };
  

  updateProduct = async (id, name, description, price, categoryId) => {
    const [result] = await pool.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, categoryId = ? WHERE id = ?',
      [name, description, price, categoryId, id]
    );
    return result.affectedRows > 0 ? { id, name, description, price, categoryId } : null;
  };

  deleteProduct = async (id) => {
    const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  };
}

export default ProductRepository;
