import UserService from '../users/users.service.js';
import AddressRepository from './address.repository.js';

class AddressService {
  constructor() {
      this.addressRepository = new AddressRepository();
      this.UserService = new UserService()
  }

  async getAllAddress() { 
      try {
          return await this.addressRepository.getAllAddresses();
      } catch (error) {
          throw new Error('Error fetching addresses: ' + error.message);
      }
  }

  async getAddressById(id) {
    try {
      const address = await this.addressRepository.getAddressById(id); 
      if (!address) {
        throw new Error('Address not found');
      }
      return address;
    } catch (error) {
      throw new Error('Error fetching address: ' + error.message);
    }
  }

  async createAddress(province, district, zone, address, userId) {
    try {
      const user = await this.UserService.getUserById(userId);
      if(!user) {
        throw new Error("User not found with given userId")
      }
      return await this.addressRepository.createAddress(province, district, zone, address, userId); 
    } catch (error) {
      throw new Error('Error creating address: ' + error.message);
    }
  }

  async updateAddress(id, province, district, zone, address, userId) {
    try {
      return await this.addressRepository.updateAddress(id,province, district, zone, address, userId); 
    } catch (error) {
      throw new Error('Error updating address: ' + error.message);
    }
  }

  async deleteAddress(id) {
    try {
      return await this.addressRepository.deleteAddress(id); 
    } catch (error) {
      throw new Error('Error deleting address: ' + error.message);
    }
  }
}

export default AddressService;
