const AlerteStock = require('../models/AlerteStock');

// Obtenir toutes les alertes
const getAlertes = async (req, res) => {
  try {
    const alertes = await AlerteStock.find().populate('produit');
    res.json(alertes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Obtenir une alerte par ID
const getAlerteById = async (req, res) => {
  try {
    const alerte = await AlerteStock.findById(req.params.id).populate('produit');
    if (!alerte) {
      return res.status(404).json({ message: 'Alerte non trouvée' });
    }
    res.json(alerte);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Créer une alerte
const createAlerte = async (req, res) => {
  try {
    const alerte = new AlerteStock(req.body);
    await alerte.save();
    res.status(201).json(alerte);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création', error: error.message });
  }
};

// Mettre à jour une alerte
const updateAlerte = async (req, res) => {
  try {
    const alerte = await AlerteStock.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!alerte) {
      return res.status(404).json({ message: 'Alerte non trouvée' });
    }
    res.json(alerte);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
};

// Supprimer une alerte
const deleteAlerte = async (req, res) => {
  try {
    const alerte = await AlerteStock.findByIdAndDelete(req.params.id);
    if (!alerte) {
      return res.status(404).json({ message: 'Alerte non trouvée' });
    }
    res.json({ message: 'Alerte supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: error.message });
  }
};

// Déclencher une alerte
const declencherAlerte = async (req, res) => {
  try {
    const alerte = await AlerteStock.findById(req.params.id);
    if (!alerte) {
      return res.status(404).json({ message: 'Alerte non trouvée' });
    }
    const resultat = alerte.declencherAlerte();
    res.json(resultat);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors du déclenchement', error: error.message });
  }
};

// Résoudre une alerte
const resoudreAlerte = async (req, res) => {
  try {
    const alerte = await AlerteStock.findById(req.params.id);
    if (!alerte) {
      return res.status(404).json({ message: 'Alerte non trouvée' });
    }
    await alerte.resoudreAlerte();
    res.json({ message: 'Alerte résolue avec succès' });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la résolution', error: error.message });
  }
};

module.exports = {
  getAlertes,
  getAlerteById,
  createAlerte,
  updateAlerte,
  deleteAlerte,
  declencherAlerte,
  resoudreAlerte
}; 