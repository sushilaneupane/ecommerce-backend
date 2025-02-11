import pool from '../../config/db.js';

class ImageRepository {
updateImage = async (id, image) => {
    const [result] = await pool.execute(
      'UPDATE product_image SET image = ? WHERE id = ?',
      [image, id]
    );
    return result.affectedRows > 0 ? { id, image} : null;
  };

  deleteImage = async (id) => {
    const [result] = await pool.execute('DELETE FROM product_image WHERE id = ?', [id]);
    return result.affectedRows > 0;
  };
}
export default ImageRepository;