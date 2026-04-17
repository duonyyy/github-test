const express = require('express');
const app = express();
app.use(express.json());

// In-memory data store
let products = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Phone', price: 500 },
];

// GET all products
app.get('/products', (req, res) => {
  res.json(products);
});

// GET product by ID
app.get('/products/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST new product
app.post('/products', (req, res) => {
  const product = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  products.push(product);
  res.status(201).json(product);
});

// PUT update product
app.put('/products/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;
  res.json(product);
});

// DELETE product
app.delete('/products/:id', (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ message: 'Product not found' });
  products.splice(index, 1);
  res.json({ message: 'Product deleted' });
});

// Search products by name
app.get('/products/search', (req, res) => {
  const query = req.query.name?.toLowerCase();
  if (!query)
    return res
      .status(400)
      .json({ message: 'Query parameter "name" is required' });
  const results = products.filter((p) => p.name.toLowerCase().includes(query));
  res.json(results);
});

// Filter products by price range
app.get('/products/filter', (req, res) => {
  const minPrice = parseFloat(req.query.minPrice) || 0;
  const maxPrice = parseFloat(req.query.maxPrice) || Infinity;
  const results = products.filter(
    (p) => p.price >= minPrice && p.price <= maxPrice
  );
  res.json(results);
});

// Get all products with sorting and pagination
app.get('/products-sorted', (req, res) => {
  let result = [...products];

  // Sorting
  const sortBy = req.query.sortBy || 'id'; // 'id', 'name', 'price'
  const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1; // 'asc' or 'desc'

  result.sort((a, b) => {
    if (typeof a[sortBy] === 'string') {
      return a[sortBy].localeCompare(b[sortBy]) * sortOrder;
    }
    return (a[sortBy] - b[sortBy]) * sortOrder;
  });

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedResult = result.slice(startIndex, endIndex);

  res.json({
    data: paginatedResult,
    pagination: {
      currentPage: page,
      pageSize: limit,
      totalItems: products.length,
      totalPages: Math.ceil(products.length / limit),
    },
  });
});

// Get product statistics
app.get('/products/stats', (req, res) => {
  if (products.length === 0) {
    return res.json({
      totalProducts: 0,
      averagePrice: 0,
      minPrice: 0,
      maxPrice: 0,
    });
  }

  const prices = products.map((p) => p.price);
  const averagePrice = (
    prices.reduce((a, b) => a + b, 0) / prices.length
  ).toFixed(2);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  res.json({
    totalProducts: products.length,
    averagePrice: parseFloat(averagePrice),
    minPrice,
    maxPrice,
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
