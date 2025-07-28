const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middlewares/auth.js');
const {
  getUsers,
  login,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Route publique
router.post('/login', login);

// Routes CRUD utilisateurs
router.get('/',authenticateToken, authorizeRole(['admin']), getUsers);
router.get('/:id',getUserById);
router.post('/',authenticateToken, authorizeRole(['admin']), createUser);
router.put('/:id',authenticateToken, updateUser);
router.delete('/:id',authenticateToken, authorizeRole(['admin']), deleteUser);

module.exports = router;
