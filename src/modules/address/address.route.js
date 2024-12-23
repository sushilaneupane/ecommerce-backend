import express from 'express';
import AddressController from './address.controller.js';


const router = express.Router();
const addressController = new AddressController();


router.get('/', addressController.getAllAddress);
router.get('/:id', addressController.getAddressById); 
router.post('/', addressController.createAddress);
router.put('/:id', addressController.updateAddress);
router.delete('/:id', addressController.deleteAddress);

export default router;
