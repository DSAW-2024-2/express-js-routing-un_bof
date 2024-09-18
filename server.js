const express = require('express');
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());

// Import routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

// Use the routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Route 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
