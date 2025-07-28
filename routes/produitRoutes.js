const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middlewares/auth.js');
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
router.post('/',authenticateToken,authorizeRole(['fournisseur']), createProduit);
router.put('/:id',authenticateToken,authorizeRole(['fournisseur']), updateProduit);
router.delete('/:id', deleteProduit);
router.patch('/:id/stock', updateStock);

module.exports = router;
