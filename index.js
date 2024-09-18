const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');

app.use(express.json());

// Use routes in a modular way
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

// Manage error 404 for non-defined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
