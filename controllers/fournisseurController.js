// controllers/fournisseurController.js
const Fournisseur = require('../models/Fournisseur');

// Obtenir tous les fournisseurs
exports.getFournisseurs = async (req, res) => {
  try {
    const fournisseurs = await Fournisseur.find();
    res.status(200).json(fournisseurs);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Obtenir un fournisseur par ID
exports.getFournisseurById = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findById(req.params.id);
    if (!fournisseur) {
      return res.status(404).json({ message: 'Fournisseur non trouvé' });
    }
    res.status(200).json(fournisseur);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Créer un nouveau fournisseur
exports.createFournisseur = async (req, res) => {
  try {
    const { nom, prenom, email, mdp, adresse, nomEntreprise, siret, contactPrincipal } = req.body;

    // Vérifier si email ou siret existe déjà
    const existEmail = await Fournisseur.findOne({ email });
    if (existEmail) return res.status(400).json({ message: 'Email déjà utilisé' });

    const existSiret = await Fournisseur.findOne({ siret });
    if (existSiret) return res.status(400).json({ message: 'SIRET déjà utilisé' });

    const newFournisseur = new Fournisseur({
      nom,
      prenom,
      email,
      mdp,
      adresse,
      role: 'fournisseur',
      nomEntreprise,
      siret,
      contactPrincipal
    });

    const savedFournisseur = await newFournisseur.save();
    res.status(201).json(savedFournisseur);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création', error: err.message });
  }
};

// Mettre à jour un fournisseur
exports.updateFournisseur = async (req, res) => {
  try {
    // Si mdp est modifié, il faut le re-hasher (donc on fait un find + save)
    const fournisseur = await Fournisseur.findById(req.params.id);
    if (!fournisseur) return res.status(404).json({ message: 'Fournisseur non trouvé' });

    // Mise à jour manuelle pour gérer mdp
    Object.keys(req.body).forEach(key => {
      fournisseur[key] = req.body[key];
    });

    const updatedFournisseur = await fournisseur.save();
    res.status(200).json(updatedFournisseur);
  } catch (err) {
    res.status(400).json({ message: 'Erreur de mise à jour', error: err.message });
  }
};

// Supprimer un fournisseur
exports.deleteFournisseur = async (req, res) => {
  try {
    const deletedFournisseur = await Fournisseur.findByIdAndDelete(req.params.id);
    if (!deletedFournisseur) {
      return res.status(404).json({ message: 'Fournisseur non trouvé' });
    }
    res.status(200).json({ message: 'Fournisseur supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur de suppression', error: err.message });
  }
};
