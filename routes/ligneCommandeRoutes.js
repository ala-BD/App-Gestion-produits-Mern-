const express = require('express');
const router = express.Router();

const {
  getLignesCommandes,
  getLigneCommandeById,
  createLigneCommande,
  updateLigneCommande,
  deleteLigneCommande
} = require('../controllers/ligneCommandeController');

// Routes CRUD pour LigneCommande
router.get('/', getLignesCommandes);          // GET all
router.get('/:id', getLigneCommandeById);     // GET by ID
router.post('/', createLigneCommande);        // POST create
router.put('/:id', updateLigneCommande);      // PUT update by ID
router.delete('/:id', deleteLigneCommande);   // DELETE by ID

module.exports = router;
