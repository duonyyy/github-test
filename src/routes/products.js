const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET all products
router.get('/', productController.getAll);

// GET product by ID
router.get('/:id', productController.getById);

// POST new product
router.post('/', productController.create);

// PUT update product
router.put('/:id', productController.update);

// DELETE product
router.delete('/:id', productController.delete);

// Search products by name
router.get('/search/byname', productController.search);

// Filter products by price range
router.get('/filter/price', productController.filterByPrice);

// Get sorted and paginated products
router.get('/sorted/list', productController.getSorted);

// Get product statistics
router.get('/stats/overview', productController.getStats);

module.exports = router;
