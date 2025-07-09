const mongoose = require('mongoose');

const livraisonSchema = new mongoose.Schema({
  commande: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commande',
    required: true
  },
  dateExpedition: {
    type: Date
  },
  dateLivraisonPrevue: {
    type: Date,
    required: true
  },
  dateLivraisonEffective: {
    type: Date
  },
  statutLivraison: {
    type: String,
    enum: ['en transit', 'livrée', 'en attente'],
    default: 'en attente'
  },
  notesLivreur: {
    type: String
  },
  signatureClient: {
    type: String
  }
});

// Methods
livraisonSchema.methods.suivreStatut = function() {
  return {
    statut: this.statutLivraison,
    dateExpedition: this.dateExpedition,
    datePrevue: this.dateLivraisonPrevue,
    dateLivraison: this.dateLivraisonEffective
  };
};

livraisonSchema.methods.confirmerLivraison = async function(signature) {
  this.statutLivraison = 'livrée';
  this.dateLivraisonEffective = new Date();
  this.signatureClient = signature;
  return await this.save();
};

const Livraison = mongoose.model('Livraison', livraisonSchema);

module.exports = Livraison; 