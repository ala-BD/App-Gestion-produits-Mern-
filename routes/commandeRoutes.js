const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middlewares/auth.js');
const {
  getCommandes,
  getCommandeById,
  createCommande,
  updateCommande,
  deleteCommande,
  updateStatutCommande,
  annulerCommande
} = require('../controllers/commandeController');

// Routes CRUD pour les commandes
router.get('/',authenticateToken,authorizeRole(['fournisseur']), getCommandes);
router.get('/:id',authenticateToken,authorizeRole(['client']), getCommandeById);
router.post('/',authenticateToken,authorizeRole(['client']), createCommande);
router.put('/:id', updateCommande);
router.delete('/:id', deleteCommande);

// Routes spécifiques aux commandes
router.patch('/:id/statut', updateStatutCommande);
router.post('/:id/annuler', annulerCommande);

module.exports = router; 