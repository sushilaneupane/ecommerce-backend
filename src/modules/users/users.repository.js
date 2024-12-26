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

  async createUser(firstName, lastName, phone, email,  hashedPassword, role ) {
    const [result] = await pool.execute(
      'INSERT INTO users (firstName, lastName, email, phone, password, role ) VALUES (?, ?, ?, ?, ?, ?)',
      [firstName, lastName, email, phone,   hashedPassword, role ]
    );
    return { id: result.insertId, firstName, lastName, email, phone,  hashedPassword, role };
  }
  
  async checkEmail (email){
    const [result] = await pool.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
    );
    return result;
   }

  async updateUser(id, firstName, lastName, phone, email, password, role) {            
    const [result] = await pool.execute(
      'UPDATE users SET firstName = ?, lastName = ?, email = ?, phone = ?, password = ?, role = ? WHERE id = ?'
      [firstName, lastName, email, phone, password, role, id]
    );
    if (result.affectedRows === 0) throw new Error('User not found');
    return { id, firstName, lastName, phone, email, password, role};
  }

  async deleteUser(id) {
    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) throw new Error('user not found');
    return { message: 'user deleted successfully' };
  }
}

export default UserRepository;
