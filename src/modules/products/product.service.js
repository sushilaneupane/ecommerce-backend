import ProductRepository from './product.respository.js';

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  getAllProducts = async () => {
    try {
      const products = await this.productRepository.getAllProducts();
      return { status: 200, data: products };
    } catch (error) {
      console.log(error);
      
      return { status: 500, message: 'Error fetching products', error: error.message };
    }
  };

  getProductById = async (id) => {
    try {
      const product = await this.productRepository.getProductById(id);
      if (product) {
        const images = await this.productRepository.getProductImages(id);
        return { status: 200, data: { ...product, images } };
      }
      return { status: 404, message: 'Product not found' };
    } catch (error) {
      console.log(error);
      
      return { status: 500, message: 'Error fetching product', error: error.message };
    }
  };

  createProduct = async (name, description, price, categoryId, images) => {
    try {
      const newProduct = await this.productRepository.createProduct(name, description, price, categoryId);
      if (images && images.length > 0) {
        const imagePaths = images.map(file => file.filename);
        await this.productRepository.addProductImages(newProduct.id, imagePaths);
      }
      return { 
        status: 201, 
        data: { 
          ...newProduct, 
          images: await this.productRepository.getProductImages(newProduct.id) 
        } 
      };
    } catch (error) {      
      return { status: 500, message: 'Error creating product', error: error.message };
    }
  };

  updateProduct = async (id, name, description, price, categoryId) => {
    try {
      const updatedProduct = await this.productRepository.updateProduct(id, name, description, price, categoryId);
      if (updatedProduct) {
        return { status: 200, data: updatedProduct };
      }
      return { status: 404, message: 'Product not found' };
    } catch (error) {
      return { status: 500, message: 'Error updating product', error: error.message };
    }
  };

  deleteProduct = async (id) => {
    try {
      const isDeleted = await this.productRepository.deleteProduct(id);
      if (isDeleted) {
        return { status: 200, message: 'Product deleted successfully' };
      }
      return { status: 404, message: 'Product not found' };
    } catch (error) {
      return { status: 500, message: 'Error deleting product', error: error.message };
    }
  };

  getProductsByCategoryId = async (categoryId) => {
    try {
      const products = await this.productRepository.getProductsByCategoryId(categoryId);
      if (products.length === 0) {
        return { status: 404, message: 'No products found for this category' };
      }
      return { status: 200, data: products };
    } catch (error) {
      return { status: 500, message: 'Error fetching products for category', error: error.message };
    }
  };
}

export default ProductService;
