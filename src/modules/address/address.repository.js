import pool from '../../config/db.js';

class AddressRepository {
  async getAllAddresses() {
    const [rows] = await pool.execute(
      `SELECT 
        address.id, 
        address.address AS fullAddress, 
        users.firstName AS firstName, 
        users.lastName AS lastName,
         address.province AS province, 
        address.district AS district,
        address.zone AS zone,
         address.address AS fullAddress, 
        users.email AS email,
        users.phone AS phone
       FROM address
       INNER JOIN users ON address.userId = users.id`, 
    );
    return rows;
  }
  async getAddressById(id) {
    const [rows] = await pool.execute(
      `SELECT 
        address.id, 
        users.firstName AS firstName, 
        users.lastName AS lastName,
         address.province AS province, 
        address.district AS district,
        address.zone AS zone,
        address.address AS fullAddress, 
        users.email AS email,
        users.phone AS phone
       FROM address
       INNER JOIN users ON address.userId = users.id
       WHERE address.id = ?`, 
      [id]
    );
    return rows[0]; 
  }
    
    async createAddress(province, district, zone, address, userId) { 
    
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
