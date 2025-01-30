import SubcategoryRepository from './category.repository.js';

class SubcategoryService {
  constructor() {
    this.subcategoryRepository = new subcategoryRepository();
  }

  async getAllSubcategories() {
    try {
      return await this.subcategoryRepository.getAllSubcategories();
    } catch (error) {
      throw new Error('Error fetching categories: ' + error.message);
    }
  }

  async getSubcategoryById(id) {
    try {
      const category = await this.subcategoryRepository.getSubcategoryById(id);
      if (!category) {
        throw new Error('Subcategory not found');
      }
      return category;
    } catch (error) {
      throw new Error('Error fetching Subcategory: ' + error.message);
    }
  }

  async createSubcategory(name, description) {
    try {
      const alreadyExist = await this.subcategoryRepository.checkName(name);       
      if (alreadyExist) {      
        throw new Error('This name already exist');
      }
  
      return await this.subcategoryRepository.createSubcategory(name, description);
    } catch (error) {
      throw new Error('Error creating Subcategory: ' + error.message);
    }
  }

  async updateSubcategory(id, name, description) {
    try {
      return await this.subcategoryRepository.updateSubcategory(id, name, description);
    } catch (error) {
      throw new Error('Error updating Subcategory: ' + error.message);
    }
  }

  async deleteSubcategory(id) {
    try {
      return await this.subcategoryRepository.deleteSubcategory(id);
    } catch (error) {
      throw new Error('Error deleting Subcategory: ' + error.message);
    }
  }
}

export default SubcategoryService;
