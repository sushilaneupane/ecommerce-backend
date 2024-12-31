import express from 'express';
import AddressController from './address.controller.js';
import checkAdminRole from '../middleware/check-admin.js';
import verifyToken from '../middleware/verify-token.js';


const router = express.Router();
const addressController = new AddressController();


router.get('/', verifyToken,addressController.getAllAddress);
router.get('/:id',verifyToken, addressController.getAddressById); 
router.post('/',verifyToken, addressController.createAddress);
router.put('/:id',verifyToken, addressController.updateAddress);
router.delete('/:id',checkAdminRole, addressController.deleteAddress);

export default router;
