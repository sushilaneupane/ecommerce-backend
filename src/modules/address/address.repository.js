import pool from '../../config/db.js';

class AddressRepository {
  async getAllAddresses() {
    const [rows] = await pool.execute('SELECT * FROM address');
    return rows;
  }

  async getAddressById(id) {
    const [rows] = await pool.execute('SELECT * FROM address WHERE id = ?', [id]);
    return rows[0];
  }
  
    async createAddress(province, district, zone, address, userId) { 
      console.log(province, district, zone,address, userId);
      
        const [result] = await pool.execute(
            'INSERT INTO address (province, district, zone, address, userId) VALUES (?, ?, ?, ?, ?)',
            [province, district, zone, address, userId]
        );
        return {
            id: result.insertId,
            province,
            district,
            zone,
            address,
            userId,
        };
    }


  async updateAddress(id, province, district, zone, address, userId) {
    const [result] = await pool.execute(
      'UPDATE address SET province = ?,district = ?, zone = ?, address = ?, userId = ? WHERE id = ?',
      [province, district, zone, address, userId, id] 
    );
    if (result.affectedRows === 0) throw new Error('Address not found');
    return { id,province, district, zone, address, userId};
  }

  async deleteAddress(id) {
    const [result] = await pool.execute('DELETE FROM address WHERE id = ?', [id]);
    if (result.affectedRows === 0) throw new Error('Address not found');
    return { message: 'Address deleted successfully' };
  }
}

export default AddressRepository;
