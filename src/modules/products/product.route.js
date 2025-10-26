import express from 'express';
import ProductController from './product.controller.js';
import checkAdminRole from '../middleware/check-admin.js';
import { uploadProductImages } from '../utils/image-upload.js';

const router = express.Router();
const productController = new ProductController();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', checkAdminRole, uploadProductImages, productController.createProduct);
router.put('/:id', checkAdminRole, uploadProductImages, productController.updateProductController);
router.delete('/:id', checkAdminRole, productController.deleteProduct);
router.get('/category/:categoryId', productController.getProductsByCategoryId);

export default router;
