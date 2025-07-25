const LigneCommande = require('../models/LigneCommande');

// Récupérer toutes les lignes de commande
const getLignesCommandes = async (req, res) => {
  try {
    const lignes = await LigneCommande.find();
    res.json(lignes);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Récupérer une ligne de commande par ID
const getLigneCommandeById = async (req, res) => {
  try {
    const ligne = await LigneCommande.findById(req.params.id);
    if (!ligne) return res.status(404).json({ message: 'LigneCommande non trouvée' });
    res.json(ligne);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Créer une nouvelle ligne de commande
const createLigneCommande = async (req, res) => {
  try {
    const { quantite, prixUnitaire } = req.body;

    if (quantite == null || prixUnitaire == null) {
      return res.status(400).json({ message: 'quantite et prixUnitaire sont requis' });
    }

    const nouvelleLigne = new LigneCommande({ quantite, prixUnitaire });
    await nouvelleLigne.save();

    res.status(201).json({ message: 'LigneCommande créée avec succès', ligneCommande: nouvelleLigne });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Mettre à jour une ligne de commande par ID
const updateLigneCommande = async (req, res) => {
  try {
    const { quantite, prixUnitaire } = req.body;

    const updateData = {};
    if (quantite !== undefined) updateData.quantite = quantite;
    if (prixUnitaire !== undefined) updateData.prixUnitaire = prixUnitaire;

    const ligne = await LigneCommande.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    if (!ligne) return res.status(404).json({ message: 'LigneCommande non trouvée' });

    res.json(ligne);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: err.message });
  }
};

// Supprimer une ligne de commande par ID
const deleteLigneCommande = async (req, res) => {
  try {
    const ligne = await LigneCommande.findByIdAndDelete(req.params.id);
    if (!ligne) return res.status(404).json({ message: 'LigneCommande non trouvée' });
    res.json({ message: 'LigneCommande supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

module.exports = {
  getLignesCommandes,
  getLigneCommandeById,
  createLigneCommande,
  updateLigneCommande,
  deleteLigneCommande
};
