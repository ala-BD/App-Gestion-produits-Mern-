const express = require('express');
const router = express.Router();
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
router.get('/', getCommandes);
router.get('/:id', getCommandeById);
router.post('/', createCommande);
router.put('/:id', updateCommande);
router.delete('/:id', deleteCommande);

// Routes spécifiques aux commandes
router.patch('/:id/statut', updateStatutCommande);
router.post('/:id/annuler', annulerCommande);

module.exports = router; 