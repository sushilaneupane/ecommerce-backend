import CategoryService from './category.service.js';

class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();
  }

  getAllCategories = async (req, res) => {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
  };

  getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
      const category = await this.categoryService.getCategoryById(id);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching category', error: error.message });
    }
  };

  createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
      const newCategory = await this.categoryService.createCategory(name, description);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: 'Error creating category', error: error.message });
    }
  };

  updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const updatedCategory = await this.categoryService.updateCategory(id, name, description);
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: 'Error updating category', error: error.message });
    }
  };

  deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.categoryService.deleteCategory(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
  };
}

export default CategoryController;
