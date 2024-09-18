const express = require('express');
const router = express.Router();

let products = []; // Array created to store the products

// Validate the correct product format
function validateProduct(req, res, next) {
  const { id, name, price, category} = req.body;

  // Check all required fields and their type
  if (!id || typeof id !== 'number') {
      return res.status(400).json({ message: 'Invalid or missing camp: id' });
  }

  if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing camp: name' });
  }

  if (!price || typeof price !== 'number') {
      return res.status(400).json({ message: 'Invalid or missing camp: price' });
  }

  if (!category || typeof category !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing camp: category' });
  }

  req.body.id = String(id);
  req.body.price = String(price);

  next();
}

// Obtain all products
router.get('/', (req, res) => {
  res.json(products);
});

// Create a new product
router.post('/', validateProduct, (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Obtain a product by its ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// Update a product
router.put('/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });

  products[productIndex] = { ...products[productIndex], ...req.body };
  res.json(products[productIndex]);
});

// Delete a product
router.delete('/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });

  products.splice(productIndex, 1);
  res.status(204).send();
});

module.exports = router;