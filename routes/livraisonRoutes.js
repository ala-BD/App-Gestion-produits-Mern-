const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middlewares/auth.js');
const {
  getLivraisons,
  getLivraisonById,
  createLivraison,
  updateLivraison,
  deleteLivraison,
  suivreStatutLivraison,
  confirmerLivraison
} = require('../controllers/livraisonController');

// Routes CRUD
router.get('/',authenticateToken,authorizeRole(['admin']), getLivraisons);
router.get('/:id',authenticateToken,authorizeRole(['client']), getLivraisonById);
router.post('/', createLivraison);
router.put('/:id', updateLivraison);
router.delete('/:id', deleteLivraison);

// Routes spécifiques
router.get('/:id/statut', suivreStatutLivraison);
router.post('/:id/confirmer',authenticateToken,authorizeRole(['fournisseur']), confirmerLivraison);

module.exports = router;
