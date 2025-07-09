const mongoose = require('mongoose');
const User = require('./User');

const adminSchema = new mongoose.Schema({
  permissions: [{
    type: String,
    enum: ['gerer_utilisateurs', 'gerer_categories', 'gerer_produits', 'gerer_commandes', 'gerer_rapports', 'gerer_stock']
  }]
});

// Methods
adminSchema.methods.gererUtilisateurs = function() {
  // Implementation for user management
  return true;
};

adminSchema.methods.gererCategories = function() {
  // Implementation for category management
  return true;
};

adminSchema.methods.suivreCommandesLivraisons = function() {
  // Implementation for order and delivery tracking
  return true;
};

adminSchema.methods.genererRapportsPDF = function() {
  // Implementation for PDF report generation
  return true;
};

adminSchema.methods.gererAlertesStock = function() {
  // Implementation for stock alert management
  return true;
};

const Admin = User.discriminator('Admin', adminSchema);

module.exports = Admin; 