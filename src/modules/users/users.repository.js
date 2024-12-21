import pool from '../../config/db.js';

class UserRepository {
  async getAllUsers() {
    const [rows] = await pool.execute('SELECT * FROM users');
    return rows;
  }

  async getUserById(id) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  async createUser(firstName, lastName, phone, email, password) {
    const [result] = await pool.execute(
      'INSERT INTO users (firstName, lastName, email, phone,  password) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, phone,  password]
    );
    return { id: result.insertId, firstName, lastName, email, phone,  password};
  }

  async updateUser(id, firstName, lastName, phone, email, password) {            
    const [result] = await pool.execute(
      'UPDATE users SET firstName = ?, lastName = ?, email = ?, phone = ?, password = ? WHERE id = ?'
      [firstName, lastName,email, phone, password, id]
    );
    if (result.affectedRows === 0) throw new Error('User not found');
    return { id, firstName, lastName, phone, email, password};
  }

  async deleteUser(id) {
    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) throw new Error('user not found');
    return { message: 'user deleted successfully' };
  }
}

export default UserRepository;
