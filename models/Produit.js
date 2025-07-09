const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  prix: {
    type: Number,
    required: true,
    min: 0
  },
  quantiteStock: {
    type: Number,
    required: true,
    min: 0
  },
  typeProduit: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  dateAjout: {
    type: Date,
    default: Date.now
  },
  statutProduit: {
    type: String,
    enum: ['disponible', 'en rupture', 'archivé'],
    default: 'disponible'
  },
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorie',
    required: true
  }
});

// Methods
produitSchema.methods.afficherDetails = function() {
  return {
    nom: this.nom,
    description: this.description,
    prix: this.prix,
    quantiteStock: this.quantiteStock,
    statut: this.statutProduit
  };
};

produitSchema.methods.mettreAJourStock = async function(quantite) {
  this.quantiteStock = quantite;
  if (this.quantiteStock <= 0) {
    this.statutProduit = 'en rupture';
  } else {
    this.statutProduit = 'disponible';
  }
  return await this.save();
};

const Produit = mongoose.model('Produit', produitSchema);

module.exports = Produit; 