import express from 'express';
import ImageController from './image.controller.js';
import checkAdminRole from '../middleware/check-admin.js';
import { uploadProductImages } from '../utils/image-upload.js';


const router = express.Router();
const imageController = new ImageController();

router.put('/:id', checkAdminRole, uploadProductImages, imageController.updateImage);
router.delete('/:id', checkAdminRole, imageController.deleteImage);
export default router;
