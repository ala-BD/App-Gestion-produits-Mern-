const express = require('express');
const router = express.Router();
const {
  getRapports,
  getRapportById,
  createRapport,
  updateRapport,
  deleteRapport,
  genererRapport
} = require('../controllers/rapportController');

// Routes CRUD pour les rapports
router.get('/', getRapports);
router.get('/:id', getRapportById);
router.post('/', createRapport);
router.put('/:id', updateRapport);
router.delete('/:id', deleteRapport);
router.post('/:id/generer', genererRapport);

module.exports = router;
