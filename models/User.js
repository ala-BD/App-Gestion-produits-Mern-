const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true, trim: true },
  prenom: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  mdp: { type: String, required: true },
  adresse: {
    rue: String,
    ville: String,
    codePostal: String,
    pays: String
  },
  statut: {
    type: String,
    enum: ['actif', 'inactif', 'bloqué'],
    default: 'actif'
  },
  role: {
    type: String,
    enum: ['admin', 'client', 'fournisseur', 'livreur'],
    required: true
  }
}, { timestamps: true });

// Hash du mot de passe avant sauvegarde
userSchema.pre('save', async function (next) {
  if (!this.isModified('mdp')) return next();
  this.mdp = await bcrypt.hash(this.mdp, 12);
  next();
});

// Méthodes
userSchema.methods.seConnecter = async function (password) {
  return await bcrypt.compare(password, this.mdp);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
