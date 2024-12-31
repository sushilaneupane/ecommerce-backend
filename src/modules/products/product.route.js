import express from 'express';
import ProductController from './product.controller.js';
import checkAdminRole from '../middleware/check-admin.js';

const router = express.Router();
const productController = new ProductController();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/',checkAdminRole, productController.createProduct);
router.put('/:id',checkAdminRole, productController.updateProduct);
router.delete('/:id',checkAdminRole, productController.deleteProduct);

export default router;
