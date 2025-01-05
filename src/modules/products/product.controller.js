import ProductService from './product.service.js';

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  getAllProducts = async (req, res) => {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
  };

  getProductById = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.productService.getProductById(id);
      res.status(result.status).json(result.message || result.data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
  };

  createProduct = async (req, res) => {
    const { name, description, price, categoryId } = req.body;
    try {
      const result = await this.productService.createProduct(name, description, price, categoryId);
      res.status(result.status).json(result.message || result.data);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error: error });
    }
  };

  updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, categoryId } = req.body;
    try {
      const result = await this.productService.updateProduct(id, name, description, price, categoryId);
      res.status(result.status).json(result.message || result.data);
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.productService.deleteProduct(id);
      res.status(result.status).json(result.message || result.data);
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
  };

  getProductsByCategoryId = async (req, res) => {
    const { categoryId } = req.params;
    try {
      const result = await this.productService.getProductsByCategoryId(categoryId);
     return res.status(result.status).json(result.message || result.data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products for category', error: error.message });
    }
  };
}

export default ProductController;
