import subCategoryService from './category.service.js';

class SubcategoryController {
  constructor() {
    this.categoryService = new subCategoryService();
  }

  getAllSubcategories = async (req, res) => {
    try {
      const categories = await this.categoryService.getAllSubcategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
  };

  getSubcategoryById = async (req, res) => {
    const { id } = req.params;
    try {
      const category = await this.categoryService.getSubcategoryById(id);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching category', error: error.message });
    }
  };

  createSubcategory = async (req, res) => {
    const { name, description } = req.body;
    try {
      const newCategory = await this.categoryService.createSubcategory(name, description);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(401).json({ message: 'Error creating category', error: error.message });
    }
  };

  updateSubcategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const updatedCategory = await this.categoryService.updateSubcategory(id, name, description);
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: 'Error updating category', error: error.message });
    }
  };

  deleteSubcategory = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.categoryService.deleteSubcategory(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
  };
}

export default SubcategoryController;
