const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middlewares/auth.js');
const {
  getCategories,
  getCategorieById,
  createCategorie,
  updateCategorie,
  deleteCategorie,
  getProduitsByCategorie
} = require('../controllers/categorieController');

// Routes CRUD pour les catégories
router.get('/', getCategories);
router.get('/:id',authorizeRole(['admin']), getCategorieById);
router.post('/',authenticateToken,authorizeRole(['admin']), createCategorie);
router.put('/:id',authorizeRole(['admin']), updateCategorie);
router.delete('/:id',authorizeRole(['admin']), deleteCategorie);
router.get('/:id/produits', getProduitsByCategorie);

module.exports = router; 