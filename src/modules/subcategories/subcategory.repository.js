import pool from '../../config/db.js';

class SubcategoryRepository {
  async getAllSubcategories() {
    const [rows] = await pool.execute('SELECT * FROM subcategories');
    return rows;
  }

  async getSubcategoryById(id) {
    const [rows] = await pool.execute('SELECT * FROM subcategories WHERE id = ?', [id]);
    return rows[0];
  }

  async createSubcategory(name, description) {
    const [result] = await pool.execute(
      'INSERT INTO subcategories (name, description) VALUES (?, ?)',
      [name, description]
    );
    return { id: result.insertId, name, description };
  }
  async checkName (name){
    const [result] = await pool.execute(
    'SELECT * FROM subcategories WHERE name = ?',
    [name]
    );
    return result[0];
   }


  async updateSubcategory(id, name, description) {
    const [result] = await pool.execute(
      'UPDATE subcategories SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );
    if (result.affectedRows === 0) throw new Error('subCategory not found');
    return { id, name, description };
  }

  async deleteSubcategory(id) {
    const [result] = await pool.execute('DELETE FROM subcategories WHERE id = ?', [id]);
    if (result.affectedRows === 0) throw new Error('Subcategory not found');
    return { message: 'Subcategory deleted successfully' };
  }
}

export default SubcategoryRepository;
