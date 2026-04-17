const Product = require('../models/product');

module.exports = {
  // GET all products
  getAll: (req, res) => {
    const products = Product.getAllProducts();
    res.json(products);
  },

  // GET product by ID
  getById: (req, res) => {
    const product = Product.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  },

  // POST new product
  create: (req, res) => {
    const { name, price, category } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }
    const product = Product.createProduct(
      name,
      price,
      category || 'Uncategorized'
    );
    res.status(201).json(product);
  },

  // PUT update product
  update: (req, res) => {
    const product = Product.updateProduct(
      req.params.id,
      req.body.name,
      req.body.price,
      req.body.category
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  },

  // DELETE product
  delete: (req, res) => {
    const deleted = Product.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted', data: deleted });
  },

  // Search products by name
  search: (req, res) => {
    const { name } = req.query;
    if (!name) {
      return res
        .status(400)
        .json({ message: 'Query parameter "name" is required' });
    }
    const results = Product.searchProducts(name);
    res.json(results);
  },

  // Filter products by price range
  filterByPrice: (req, res) => {
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || Infinity;
    const results = Product.filterByPrice(minPrice, maxPrice);
    res.json(results);
  },

  // Get sorted and paginated products
  getSorted: (req, res) => {
    const sortBy = req.query.sortBy || 'id';
    const sortOrder = req.query.sortOrder || 'asc';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = Product.getSortedAndPaginated(
      sortBy,
      sortOrder,
      page,
      limit
    );
    res.json(result);
  },

  // Get product statistics
  getStats: (req, res) => {
    const stats = Product.getStatistics();
    res.json(stats);
  },
};
