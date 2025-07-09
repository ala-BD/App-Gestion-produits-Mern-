const express = require('express');
const router = express.Router();
const {
  getAlertes,
  getAlerteById,
  createAlerte,
  updateAlerte,
  deleteAlerte,
  declencherAlerte,
  resoudreAlerte
} = require('../controllers/alerteStockController');

// Routes CRUD pour les alertes de stock
router.get('/', getAlertes);
router.get('/:id', getAlerteById);
router.post('/', createAlerte);
router.put('/:id', updateAlerte);
router.delete('/:id', deleteAlerte);

// Routes spécifiques aux alertes
router.post('/:id/declencher', declencherAlerte);
router.post('/:id/resoudre', resoudreAlerte);

module.exports = router; 