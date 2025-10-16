import AddressService from './address.service.js'; 
class AddressController {
  constructor() {
    this.addressService = new AddressService();
  }

  getAllAddress = async (req, res) => {
    try {
      const addresses = await this.addressService.getAllAddress(); 
      res.status(200).json(addresses);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching addresses', error: error.message }); 
    }
  };

  getAddressById = async (req, res) => {
    const { id } = req.params;
    try {
      const address = await this.addressService.getAddressById(id);
      if (address) {
        res.status(200).json(address);
      } else {
        res.status(404).json({ message: 'Address not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching address', error: error.message });
    }
  };
  getAddressByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
      const address = await this.addressService.getAddressByUserId(userId);
      if (address) {
        res.status(200).json(address);
      } else {
        res.status(404).json('Address not found');
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching address', error: error.message });
    }
  };

  createAddress = async (req, res) => {
    try {
        const { province, district, zone, address, userId } = req.body;
        const newAddress = await this.addressService.createAddress(
            province,
            district,
            zone,
            address,
            userId
        );
        res.status(201).json(newAddress);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


  updateAddress = async (req, res) => {
    const { id } = req.params;
    const { province, district, zone, address, userId } = req.body;
    try {
      const updatedAddress = await this.addressService.updateAddress(id, province, district, zone, address, userId);
      if (updatedAddress) {
        res.status(200).json(updatedAddress);
      } else {
        res.status(404).json({ message: 'Address not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating address', error: error.message });
    }
  };

  deleteAddress = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await this.addressService.deleteAddress(id);
      if (deleted) {
        res.status(200).json({ message: 'Address deleted successfully' });
      } else {
        res.status(404).json({ message: 'Address not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting address', error: error.message });
    }
  };
}

export default AddressController;
