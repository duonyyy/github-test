const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
const productsRouter = require('./routes/products');
app.use('/products', productsRouter);

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Product API',
    version: '1.5.0 (main branch)',
  });
});

module.exports = app;
