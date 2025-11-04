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
  const userId = req.query?.userId || null;

  try {
    const result = await this.productService.getProductById(id, userId);
    res.status(result.status).json(result.message || result.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};

  createProduct = async (req, res) => {
    try {
      const { name, description, price, categoryId } = req.body;
      const newImages = req.files?.files || [];

      const result = await this.productService.createProduct(
        name,
        description,
        parseFloat(price),
        parseInt(categoryId),
        newImages
      );

      return res.status(result.status).json(result.data || { message: result.message });
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error: error.message });
    }
  };
  

  updateProductController = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, categoryId, existingImages } = req.body;
      const newImages = req.files?.files || [];
      const parsedExistingImages = existingImages ? JSON.parse(existingImages) : [];
      const result = await this.productService.updateProduct(
        parseInt(id),
        name,
        description,
        parseFloat(price),
        parseInt(categoryId),
        parsedExistingImages,
        newImages
      );

      return res
        .status(result.status)
        .json(result.data || { message: result.message });
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ message: "Error updating product", error: error.message });
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
  
 getTotalProducts = async (req, res) => {
  try {
    const total = await this.productService.getTotalLengthProducts();
    res.status(200).json({ totalProducts: total });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total products", error: error.message });
  }
};
}


export default ProductController;
