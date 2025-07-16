const express = require('express');
const router = express.Router();
const {
  getProduits,
  getProduitById,
  createProduit,
  updateProduit,
  deleteProduit,
  updateStock
} = require('../controllers/produitController');

router.get('/', getProduits);
router.get('/:id', getProduitById);
router.post('/', createProduit);
router.put('/:id', updateProduit);
router.delete('/:id', deleteProduit);
router.patch('/:id/stock', updateStock);

module.exports = router;
