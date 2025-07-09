const express = require('express');
const router = express.Router();
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
router.get('/:id', getCategorieById);
router.post('/', createCategorie);
router.put('/:id', updateCategorie);
router.delete('/:id', deleteCategorie);
router.get('/:id/produits', getProduitsByCategorie);

module.exports = router; 