

const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// CREATE
router.post('/', ProductController.createProduct);

// READ ALL
router.get('/', ProductController.getAllProducts);

// READ ONE
router.get('/:id', ProductController.getProductById);

// UPDATE
router.put('/:id', ProductController.updateProduct);

// DELETE
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
