import UserRepository from './users.repository.js';

class UserService {
  constructor() {
    this.UserRepository= new UserRepository();
  }

  async getAllUsers() {
    try {      
      return await this.UserRepository.getAllUsers();
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }

  async getUserById(id) {
    try {
      const user = await this.UserRepository.getUserById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createUser(firstName, lastName, phone, email, password) {
    try {
  
      return await this.UserRepository.createUser(firstName, lastName, phone, email, password);
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  async updateUser(id, firstName, lastName, phone, email, password) {
    try {      
      return await this.UserRepository.updateUser(id,firstName, lastName, phone, email, password);
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }

  async deleteUser(id) {
    try {
      return await this.UserRepository.deleteUser(id);
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }
}

export default UserService;
