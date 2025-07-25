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
router.get('/',authenticateToken, authorizeRole(['admin', 'client']), getUsers);
router.get('/:id',authenticateToken, authorizeRole(['admin', 'client']), getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id',authenticateToken, authorizeRole(['admin']), deleteUser);

module.exports = router;
 