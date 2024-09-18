const express = require('express');
const router = express.Router();

let users = []; // Array created to store the users

// Validate the correct user format
function validateUser(req, res, next) {
  const { id, name, email, age } = req.body;

  // Check all required fields and their type
  if (!id || typeof id !== 'number') {
      return res.status(400).json({ message: 'Invalid or missing camp: id' });
  }

  if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing camp: name' });
  }

  if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing camp: email' });
  }

  if (!age || typeof age !== 'number') {
      return res.status(400).json({ message: 'Invalid or missing camp: age' });
  }

  req.body.id = String(id);
  req.body.age = String(age);

  next();
}

// Obtain all users
router.get('/', (req, res) => {
  res.json(users);
});

// Crete a new user
router.post('/', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Obtain a user by their ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// Update a user
router.put('/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

  users[userIndex] = { ...users[userIndex], ...req.body };
  res.json(users[userIndex]);
});

// Delete a user
router.delete('/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

  users.splice(userIndex, 1);
  res.status(204).send();
});

module.exports = router;