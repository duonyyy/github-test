const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Product API',
    version: '2.0.0 (feature/category branch)',
  });
});

module.exports = app;
