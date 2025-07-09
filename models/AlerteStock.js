const mongoose = require('mongoose');

const alerteStockSchema = new mongoose.Schema({
  produit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produit',
    required: true
  },
  seuilMinimum: {
    type: Number,
    required: true,
    min: 0
  },
  dateAlerte: {
    type: Date,
    default: Date.now
  },
  statutAlerte: {
    type: String,
    enum: ['active', 'résolue'],
    default: 'active'
  }
});

// Methods
alerteStockSchema.methods.declencherAlerte = function() {
  // Implementation for triggering alert
  // This would typically send notifications
  return {
    produit: this.produit,
    seuil: this.seuilMinimum,
    date: this.dateAlerte,
    statut: this.statutAlerte
  };
};

alerteStockSchema.methods.resoudreAlerte = async function() {
  this.statutAlerte = 'résolue';
  return await this.save();
};

const AlerteStock = mongoose.model('AlerteStock', alerteStockSchema);

module.exports = AlerteStock; 