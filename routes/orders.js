const express = require('express');
const router = express.Router();

let orders = []; // Array created to store the orders

// Validate the correct order format
function validateOrder(req, res, next) {
    const { id, userId, productId, quantity, status } = req.body;

    // Check all required fields and their type
    if (!id || typeof id !== 'number') {
        return res.status(400).json({ message: 'Invalid or missing camp: id' });
    }

    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing camp: userId' });
    }

    if (!productId || typeof productId !== 'number') {
        return res.status(400).json({ message: 'Invalid or missing camp: productId' });
    }

    if (!quantity || typeof quantity !== 'number') {
        return res.status(400).json({ message: 'Invalid or missing camp: quantity' });
    }
    
    if (!status || typeof status !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing camp: status' });
    }

    req.body.id = String(id);
    req.body.productId = String(productId);
    req.body.quantity = String(quantity);

    next();
}

// Get all orders
router.get('/', (req, res) => {
    res.json(orders);
});

// Create a new order
router.post('/', validateOrder, (req, res) => {
    const newOrder = req.body;
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

// Obtain an order by its ID
router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
});

module.exports = router;
