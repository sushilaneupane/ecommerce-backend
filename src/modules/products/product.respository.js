import pool from '../../config/db.js';

class ProductRepository {
  getAllProducts = async () => {
    const [rows] = await pool.execute(
      `SELECT 
      p.id, 
      p.name AS productName, 
      p.price, 
      p.description,
      c.name AS categoryName, 
      c.description AS categoryDescription,
      CASE 
        WHEN COUNT(pi.id) = 0 THEN JSON_ARRAY()
        ELSE JSON_ARRAYAGG(JSON_OBJECT('id', pi.id, 'image', pi.image))
      END AS images
     FROM products AS p
     INNER JOIN categories AS c ON p.categoryId = c.id
     LEFT JOIN product_image AS pi ON p.id = pi.productId
     GROUP BY p.id, p.name, p.price, p.description, c.name, c.description`,
    );

    return rows;
  };

  getProductById = async (id) => {
    const [rows] = await pool.execute(
      `SELECT 
    p.id, 
    p.name AS productName, 
    p.price, 
    p.description,
    c.name AS categoryName, 
    c.description AS categoryDescription,
    CASE 
      WHEN COUNT(pi.id) = 0 THEN JSON_ARRAY()
      ELSE JSON_ARRAYAGG(JSON_OBJECT('id', pi.id, 'image', pi.image))
    END AS images
   FROM products AS p
   INNER JOIN categories AS c ON p.categoryId = c.id
   LEFT JOIN product_image AS pi ON p.id = pi.productId
   WHERE p.id = ?
   GROUP BY p.id, p.name, p.price, p.description, c.name, c.description`,
      [id]
    );
    return rows[0];
  };

  getProductsByCategoryId = async (categoryId) => {
    const [rows] = await pool.execute(
      `SELECT 
      p.id, 
      p.name AS productName, 
      p.price, 
      p.description,
      c.name AS categoryName, 
      c.description AS categoryDescription,
      CASE 
        WHEN COUNT(pi.id) = 0 THEN JSON_ARRAY()
        ELSE JSON_ARRAYAGG(JSON_OBJECT('id', pi.id, 'image', pi.image))
      END AS images
     FROM products AS p
     INNER JOIN categories AS c ON p.categoryId = c.id
     LEFT JOIN product_image AS pi ON p.id = pi.productId
     WHERE p.categoryId = ?
     GROUP BY p.id, p.name, p.price, p.description, c.name, c.description`,
      [categoryId]
    );
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

  addProductImages = async (productId, imagePaths) => {
    try {
      const values = imagePaths.map(image => [image, productId]);
      const [result] = await pool.query(
        'INSERT INTO product_image (image, productId) VALUES ?',
        [values]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error adding product images: ${error.message}`);
    }
  };

  getProductImages = async (productId) => {
    console.log(productId, "productId");
    const [rows] = await pool.execute(
      'SELECT image FROM product_image WHERE productId = ?',
      [productId]
    );
    return rows.map(row => row.image);
  };
  deleteProductImages = async (imageNames) => {
    try {
      if (!imageNames || imageNames.length === 0) return false;
      const [result] = await pool.query(
        `DELETE FROM product_image WHERE image IN (?)`,
        [imageNames]
      );

      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting product images: ${error.message}`);
    }
  };
  getTotalLengthProducts = async () => {
    const [rows] = await pool.execute('SELECT COUNT(*) AS total FROM products');
    return rows[0].total || 0;
  };

}
export default ProductRepository;