import UserRepository from './users.repository.js';
import bcrypt from 'bcrypt';


class UserService {
  constructor() {
    this.UserRepository = new UserRepository();
  }

  async getAllUsers() {
    try {
      return await this.UserRepository.getAllUsers();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserById(id) {
    try {
      const user = await this.UserRepository.getUserById(id);
      if (!user) {
        throw new Error('User not found with given userId');
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createUser(firstName, lastName, phone, email, password, role) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      const alreadyExist = await this.UserRepository.checkEmail(email); 
      if (alreadyExist) {
        throw new Error('This email already exists');
      }
  
      return await this.UserRepository.createUser(
        firstName,
        lastName,
        phone,
        email,
        hashedPassword,
        role
      );
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }
  

  async updateUser(id, firstName, lastName, phone, email, password, role) {
    try {
      return await this.UserRepository.updateUser(id, firstName, lastName, phone, email, password, role);
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
