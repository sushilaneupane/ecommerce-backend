import UserService from './users.service.js';

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async (req, res) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  };

  getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await this.userService.getUserById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
  };

  createUser = async (req, res) => {
    try {
      const {firstName, lastName, phone, email, password, role} = req.body;
      const newUser = await this.userService.createUser(firstName, lastName, phone, email, password, role);
      return res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: 'Error creating user', error: error.message });
    }
  };

  updateUser = async (req, res) => {
    const { id } = req.params;
    const {firstName, lastName, phone, email } = req.body;    
    try {
      const updatedUser = await this.userService.updateUser(id, firstName, lastName, phone, email);
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Error updating user', error: error.message });
    }
  };

  deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await this.userService.deleteUser(id);
      if (deleted) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Error deleting user', error: error.message });
    }
  };
   
  loginUser = async (req, res) => {
    const { email, password } = req.body; 
    try {
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      const login = await this.userService.loginUser(email, password);

      if (login) {
        res.status(200).json({ 
          message: 'User logged in successfully', 
          data: login 
        });
      } else {
        res.status(404).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(400).json({ 
        message: 'Error logging in user', 
        error: error.message 
      });
    }
  };
}
export default UserController;
