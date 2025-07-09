const mongoose = require('mongoose');
const User = require('./User');

const fournisseurSchema = new mongoose.Schema({
  nomEntreprise: {
    type: String,
    required: true,
    trim: true
  },
  siret: {
    type: String,
    required: true,
    unique: true
  },
  contactPrincipal: {
    type: String,
    required: true
  }
});

// Methods
fournisseurSchema.methods.ajouterProduit = function() {
  // Implementation for adding product
  return true;
};

fournisseurSchema.methods.modifierProduit = function() {
  // Implementation for modifying product
  return true;
};

fournisseurSchema.methods.voirCommandesRecues = function() {
  // Implementation for viewing received orders
  return true;
};

fournisseurSchema.methods.preparerLivraison = function() {
  // Implementation for preparing delivery
  return true;
};

fournisseurSchema.methods.voirStatistiquesVentes = function() {
  // Implementation for viewing sales statistics
  return true;
};

const Fournisseur = User.discriminator('Fournisseur', fournisseurSchema);

module.exports = Fournisseur; 