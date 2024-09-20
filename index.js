const express = require('express');
const app = express();
const { router: usersRouter } = require('./routes/users');
const { router: productsRouter } = require('./routes/products');
const ordersRouter = require('./routes/orders');

app.use(express.json());

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
