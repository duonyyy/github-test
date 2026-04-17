const Product = require('../models/product');

module.exports = {
  // GET all categories
  getAll: (req, res) => {
    const categories = Product.getAllCategories();
    res.json(categories);
  },

  // GET category by ID
  getById: (req, res) => {
    const category = Product.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  },

  // POST new category
  create: (req, res) => {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    const category = Product.createCategory(name, description);
    res.status(201).json(category);
  },

  // PUT update category
  update: (req, res) => {
    const { name, description } = req.body;
    const category = Product.updateCategory(req.params.id, name, description);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  },

  // DELETE category
  delete: (req, res) => {
    const deleted = Product.deleteCategory(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted', data: deleted });
  },

  // GET products by category
  getProductsByCategory: (req, res) => {
    const { categoryName } = req.params;
    if (!categoryName) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    const products = Product.getProductsByCategory(categoryName);
    res.json({
      category: categoryName,
      count: products.length,
      products,
    });
  },
};
