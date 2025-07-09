const mongoose = require('mongoose');

const ligneCommandeSchema = new mongoose.Schema({
  produit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produit',
    required: true
  },
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
});

ligneCommandeSchema.methods.calculerSousTotal = function() {
  return this.quantite * this.prixUnitaire;
};

const commandeSchema = new mongoose.Schema({
  numeroCommande: {
    type: String,
    required: true,
    unique: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  dateCommande: {
    type: Date,
    default: Date.now
  },
  statutCommande: {
    type: String,
    enum: ['en attente', 'confirmée', 'en préparation', 'expédiée', 'livrée', 'annulée'],
    default: 'en attente'
  },
  lignesCommande: [ligneCommandeSchema],
  totalCommande: {
    type: Number,
    required: true
  },
  taxesAppliquees: {
    type: Number,
    required: true
  },
  adresseLivraison: {
    rue: { type: String, required: true },
    ville: { type: String, required: true },
    codePostal: { type: String, required: true },
    pays: { type: String, required: true }
  },
  modePaiement: {
    type: String,
    required: true
  },
  datePaiement: {
    type: Date
  }
});

// Methods
commandeSchema.methods.calculerTotal = function() {
  const sousTotal = this.lignesCommande.reduce((total, ligne) => {
    return total + ligne.calculerSousTotal();
  }, 0);
  this.totalCommande = sousTotal + this.taxesAppliquees;
  return this.totalCommande;
};

commandeSchema.methods.changerStatut = async function(nouveauStatut) {
  this.statutCommande = nouveauStatut;
  return await this.save();
};

commandeSchema.methods.annulerCommande = async function() {
  if (this.statutCommande !== 'livrée') {
    this.statutCommande = 'annulée';
    return await this.save();
  }
  throw new Error('Impossible d\'annuler une commande déjà livrée');
};

const Commande = mongoose.model('Commande', commandeSchema);

module.exports = Commande; 