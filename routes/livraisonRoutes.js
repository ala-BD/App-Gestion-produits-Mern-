const express = require('express');
const router = express.Router();
const {
  getLivraisons,
  getLivraisonById,
  createLivraison,
  updateLivraison,
  deleteLivraison,
  suivreStatutLivraison,
  confirmerLivraison
} = require('../controllers/livraisonController');

// Routes CRUD pour les livraisons
router.get('/', getLivraisons);
router.get('/:id', getLivraisonById);
router.post('/', createLivraison);
router.put('/:id', updateLivraison);
router.delete('/:id', deleteLivraison);

// Routes spécifiques aux livraisons
router.get('/:id/statut', suivreStatutLivraison);
router.post('/:id/confirmer', confirmerLivraison);

module.exports = router; 