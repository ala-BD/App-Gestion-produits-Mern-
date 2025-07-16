const Rapport = require('../models/Rapport');

// Obtenir tous les rapports
const getRapports = async (req, res) => {
  try {
    const rapports = await Rapport.find();
    res.json(rapports);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Obtenir un rapport par ID
const getRapportById = async (req, res) => {
  try {
    const rapport = await Rapport.findById(req.params.id);
    if (!rapport) return res.status(404).json({ message: 'Rapport non trouvé' });
    res.json(rapport);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Créer un rapport
const createRapport = async (req, res) => {
  try {
    const { typeRapport, periode, contenuPDF } = req.body;

    if (!typeRapport || !periode || !periode.debut || !periode.fin || !contenuPDF) {
      return res.status(400).json({ message: 'Champs obligatoires manquants' });
    }

    const nouveauRapport = new Rapport({ typeRapport, periode, contenuPDF });
    await nouveauRapport.save();

    res.status(201).json({ message: 'Rapport créé avec succès', rapport: nouveauRapport });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création', error: error.message });
  }
};

// Mettre à jour un rapport
const updateRapport = async (req, res) => {
  try {
    const rapport = await Rapport.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!rapport) return res.status(404).json({ message: 'Rapport non trouvé' });

    res.json({ message: 'Rapport mis à jour', rapport });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
};

// Supprimer un rapport
const deleteRapport = async (req, res) => {
  try {
    const rapport = await Rapport.findByIdAndDelete(req.params.id);
    if (!rapport) return res.status(404).json({ message: 'Rapport non trouvé' });

    res.json({ message: 'Rapport supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: error.message });
  }
};

// Générer un rapport (simulation)
const genererRapport = async (req, res) => {
  try {
    const rapport = await Rapport.findById(req.params.id);
    if (!rapport) return res.status(404).json({ message: 'Rapport non trouvé' });

    const resultat = await rapport.genererRapport();
    res.json({ message: 'Rapport généré avec succès', resultat });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la génération', error: error.message });
  }
};

module.exports = {
  getRapports,
  getRapportById,
  createRapport,
  updateRapport,
  deleteRapport,
  genererRapport
};
