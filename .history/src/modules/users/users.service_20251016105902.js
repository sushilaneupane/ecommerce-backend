import UserRepository from './users.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

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
      if (alreadyExist.length !== 0) {      
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

  async updateUser(id, firstName, lastName, phone, email) {
    try {
      return await this.UserRepository.updateUser(id, firstName, lastName, phone, email);
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

  async loginUser(userName, password) {
    try {
      
      if (!userName || !password) {
        throw new Error("Username and password are required");
      }
      const user = await this.UserRepository.getUserByEmail(userName);
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign(
        { id: user.id, role: user.role, email: user.email }, 
        process.env.JWTSECRETKEY,
        { expiresIn: "1h" }
      );

      return { 
        token, 
        user: { 
          id: user.id, 
          email: user.email, 
          role: user.role 
        } 
      };
    } catch (error) {
      throw new Error("Error logging in: " + error.message);
    }
  }
}
export default UserService;
