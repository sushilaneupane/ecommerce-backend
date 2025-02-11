import ImageRepository from './image.repository.js';

class ImageService {
  constructor() {
    this.imageRepository = new ImageRepository();
  }
  updateImage = async (id, image) => {
    try {
      const updatedImage = await this.imageRepository.updateImage(id, image);
      if (updatedImage) {
        return { status: 200, data: updatedImage };
      }
      return { status: 404, message: 'Product not found' };
    } catch (error) {
      return { status: 500, message: 'Error updating product', error: error.message };
    }
  };

  deleteImage = async (id) => {
    try {
      const isDeleted = await this.imageRepository.deleteImage(id);
      if (isDeleted) {
        return { status: 200, message: 'Image deleted successfully' };
      }
      return { status: 404, message: 'Image not found' };
    } catch (error) {
      return { status: 500, message: 'Error image product', error: error.message };
    }
  };
}
export default ImageService;
