import CategoryRepository from './category.repository.js';

class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async getAllCategories() {
    try {
      return await this.categoryRepository.getAllCategories();
    } catch (error) {
      throw new Error('Error fetching categories: ' + error.message);
    }
  }

  async getCategoryById(id) {
    try {
      const category = await this.categoryRepository.getCategoryById(id);
      if (!category) {
        throw new Error('Category not found');
      }
      return category;
    } catch (error) {
      throw new Error('Error fetching category: ' + error.message);
    }
  }

  async createCategory(name, description) {
    try {
      const alreadyExist = await this.categoryRepository.checkName(name);       
      if (alreadyExist) {      
        throw new Error('This name already exist');
      }
  
      return await this.categoryRepository.createCategory(name, description);
    } catch (error) {
      throw new Error('Error creating category: ' + error.message);
    }
  }

  async updateCategory(id, name, description) {
    try {
      return await this.categoryRepository.updateCategory(id, name, description);
    } catch (error) {
      throw new Error('Error updating category: ' + error.message);
    }
  }

  async deleteCategory(id) {
    try {
      return await this.categoryRepository.deleteCategory(id);
    } catch (error) {
      throw new Error('Error deleting category: ' + error.message);
    }
  }
}

export default CategoryService;
