const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middlewares/auth.js');
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
router.get('/',authenticateToken,authorizeRole(['admin']), getAlertes);
router.get('/:id', getAlerteById);
router.post('/', createAlerte);
router.put('/:id', updateAlerte);
router.delete('/:id', deleteAlerte);

// Routes spécifiques aux alertes
router.post('/:id/declencher', declencherAlerte);
router.put('/:id/resoudre',authenticateToken,authorizeRole(['admin']), resoudreAlerte);

module.exports = router; 