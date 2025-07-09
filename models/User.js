const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nom: { 
    type: String, 
    required: true, 
    trim: true 
  },
  prenom: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true 
  },
  mdp: { 
    type: String, 
    required: true 
  },
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
}, {
  discriminatorKey: 'userType',
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('mdp')) return next();
  this.mdp = await bcrypt.hash(this.mdp, 12);
  next();
});

// Methods
userSchema.methods.seConnecter = async function(password) {
  return await bcrypt.compare(password, this.mdp);
};

userSchema.methods.seDeconnecter = function() {
  // Implementation will be handled by authentication middleware/controller
  return true;
};

userSchema.methods.gererProfil = function() {
  // Base profile management functionality
  return this;
};

const User = mongoose.model('User', userSchema);

module.exports = User; 