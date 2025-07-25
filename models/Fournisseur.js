// models/Fournisseur.js
const mongoose = require('mongoose');
const User = require('./User');

const fournisseurSchema = new mongoose.Schema({
  nomEntreprise: { type: String, required: true, trim: true },
  siret: { type: String, required: true, unique: true },
  contactPrincipal: { type: String, required: true }
});

// Ici, on peut ajouter les méthodes spécifiques fournisseur si besoin

const Fournisseur = User.discriminator('Fournisseur', fournisseurSchema);

module.exports = Fournisseur;
