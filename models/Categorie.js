const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
  nomCategorie: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  descriptionCategorie: {
    type: String,
    required: true
  },
  typeCategorie: {
    type: String,
    required: true
  },
  imageCategorie: {
    type: String,
    required: true
  }
});

// Methods
categorieSchema.methods.listerProduitsParCategorie = async function() {
  return await mongoose.model('Produit').find({ categorie: this._id });
};

const Categorie = mongoose.model('Categorie', categorieSchema);

module.exports = Categorie; 