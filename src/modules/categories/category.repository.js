import pool from '../../config/db.js';

class CategoryRepository {
  async getAllCategories() {
    const [rows] = await pool.execute('SELECT * FROM categories');
    return rows;
  }

  async getCategoryById(id) {
    const [rows] = await pool.execute('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  }

  async createCategory(name, description) {
    const [result] = await pool.execute(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description]
    );
    return { id: result.insertId, name, description };
  }

  async updateCategory(id, name, description) {
    const [result] = await pool.execute(
      'UPDATE categories SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );
    if (result.affectedRows === 0) throw new Error('Category not found');
    return { id, name, description };
  }

  async deleteCategory(id) {
    const [result] = await pool.execute('DELETE FROM categories WHERE id = ?', [id]);
    if (result.affectedRows === 0) throw new Error('Category not found');
    return { message: 'Category deleted successfully' };
  }
}

export default CategoryRepository;
