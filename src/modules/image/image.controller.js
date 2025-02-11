import ImageService from './image.service.js';

class ImageController {
  constructor() {
    this.imageService = new ImageService();
  }

updateImage = async (req, res) => {
    const { id } = req.params;
    const {image } = req.files;
    try {
      const result = await this.imageService.updateImage(id, image);
      res.status(result.status).json(result.message || result.data);
    } catch (error) {
      res.status(500).json({ message: 'Error updating image', error: error.message });
    }
  };

  deleteImage = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.imageService.deleteImage(id);
      res.status(result.status).json(result.message || result.data);
    } catch (error) {
      res.status(500).json({ message: 'Error deleting image', error: error.message });
    }
  };
}
export default ImageController;