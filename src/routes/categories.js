const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// GET all categories
router.get('/', categoryController.getAll);

// GET category by ID
router.get('/:id', categoryController.getById);

// POST new category
router.post('/', categoryController.create);

// PUT update category
router.put('/:id', categoryController.update);

// DELETE category
router.delete('/:id', categoryController.delete);

// GET products by category name
router.get('/name/:categoryName', categoryController.getProductsByCategory);

module.exports = router;
