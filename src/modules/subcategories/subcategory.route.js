import express from 'express';
import SubcategoryController from './subcategory.controller.js';
import checkAdminRole from '../middleware/check-admin.js'

const router = express.Router();
const subcategoryController = new CategoryController();

router.get('/', subcategoryController.getAllSubcategories);
router.get('/:id', subcategoryController.getSubcategoryById);
router.post('/',checkAdminRole, subcategoryController.createSubcategory);
router.put('/:id',checkAdminRole, subcategoryController.updateSubcategory);
router.delete('/:id',checkAdminRole, subcategoryController.deleteSubcategory);

export default router;
