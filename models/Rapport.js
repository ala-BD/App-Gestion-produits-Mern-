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

// Methods
rapportSchema.methods.genererRapport = async function() {
  // Implementation for report generation
  // This would typically involve gathering data and generating a PDF
  return {
    type: this.typeRapport,
    periode: this.periode,
    url: this.contenuPDF
  };
};

const Rapport = mongoose.model('Rapport', rapportSchema);

module.exports = Rapport; 