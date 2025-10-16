import express from 'express';
import UserController from './users.controller.js';
import checkAdminRole from '../middleware/check-admin.js'
import verifyToken from '../middleware/verify-token.js';

const router = express.Router();
const userController = new UserController();

router.get('/', checkAdminRole, userController.getAllUsers);
router.get('/:id',verifyToken, userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id',verifyToken,userController.updateUser);
router.delete('/:id',checkAdminRole, userController.deleteUser);
router.post('/login',userController.loginUser);
export default router;