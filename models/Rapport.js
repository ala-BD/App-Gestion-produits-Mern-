const mongoose = require('mongoose');

const rapportSchema = new mongoose.Schema({
  typeRapport: {
    type: String,
    enum: ['ventes', 'stock', 'utilisateurs'],
    required: true
  },
  dateGeneration: {
    type: Date,
    default: Date.now
  },
  periode: {
    debut: {
      type: Date,
      required: true
    },
    fin: {
      type: Date,
      required: true
    }
  },
  contenuPDF: {
    type: String,
    required: true
  }
});

// Méthode personnalisée pour simuler la génération de rapport
rapportSchema.methods.genererRapport = async function () {
  return {
    type: this.typeRapport,
    periode: this.periode,
    url: this.contenuPDF
  };
};

const Rapport = mongoose.model('Rapport', rapportSchema);
module.exports = Rapport;
