const mongoose = require('mongoose');

const ligneCommandeSchema = new mongoose.Schema({
  quantite: {
    type: Number,
    required: true,
    min: 1
  },
  prixUnitaire: {
    type: Number,
    required: true,
    min: 0
  }
}, { timestamps: true });

ligneCommandeSchema.methods.calculerSousTotal = function() {
  return this.quantite * this.prixUnitaire;
};

const LigneCommande = mongoose.model('LigneCommande', ligneCommandeSchema);

module.exports = LigneCommande;
