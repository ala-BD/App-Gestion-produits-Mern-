const mongoose = require('mongoose');
const User = require('./User');

const clientSchema = new mongoose.Schema({
  historiqueCommandes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commande'
  }]
});

// Methods
clientSchema.methods.rechercherProduits = function(criteria) {
  // Implementation for product search
  return true;
};

clientSchema.methods.filtrerProduits = function(filters) {
  // Implementation for product filtering
  return true;
};

clientSchema.methods.passerCommande = function() {
  // Implementation for order placement
  return true;
};

clientSchema.methods.voirHistoriqueCommandes = function() {
  // Implementation for order history viewing
  return this.historiqueCommandes;
};

clientSchema.methods.suivreLivraison = function(commandeId) {
  // Implementation for delivery tracking
  return true;
};

const Client = User.discriminator('Client', clientSchema);

module.exports = Client; 