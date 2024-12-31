import express from 'express';
import CategoryController from './category.controller.js';
import checkAdminRole from '../middleware/check-admin.js'

const router = express.Router();
const categoryController = new CategoryController();

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/',checkAdminRole, categoryController.createCategory);
router.put('/:id',checkAdminRole, categoryController.updateCategory);
router.delete('/:id',checkAdminRole, categoryController.deleteCategory);

export default router;
