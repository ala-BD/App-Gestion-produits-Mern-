const Livraison = require('../models/Livraison');
const Commande = require('../models/Commande');

// Obtenir toutes les livraisons
const getLivraisons = async (req, res) => {
  try {
    const livraisons = await Livraison.find().populate('commande');
    res.json(livraisons);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Obtenir une livraison par ID
const getLivraisonById = async (req, res) => {
  try {
    const livraison = await Livraison.findById(req.params.id).populate('commande');
    if (!livraison) {
      return res.status(404).json({ message: 'Livraison non trouvée' });
    }
    res.json(livraison);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Créer une livraison
const createLivraison = async (req, res) => {
  try {
    const { commande, dateLivraisonPrevue, notesLivreur } = req.body;

    // Vérifier si une livraison existe déjà pour cette commande
    const existingLivraison = await Livraison.findOne({ commande });
    if (existingLivraison) {
      return res.status(400).json({ message: 'Une livraison existe déjà pour cette commande.' });
    }

    // Créer une nouvelle livraison
    const newLivraison = new Livraison({
      commande,
      dateLivraisonPrevue,
      notesLivreur
    });

    // Sauvegarder la livraison
    await newLivraison.save();

    // Mettre à jour le statut de la commande
    await Commande.findByIdAndUpdate(
      commande,
      { statutCommande: 'en préparation' }
    );

    res.status(201).json({ message: 'Livraison créée avec succès.', livraison: newLivraison });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Mettre à jour une livraison
const updateLivraison = async (req, res) => {
  try {
    const livraison = await Livraison.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!livraison) {
      return res.status(404).json({ message: 'Livraison non trouvée' });
    }
    res.json(livraison);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
};

// Supprimer une livraison
const deleteLivraison = async (req, res) => {
  try {
    const livraison = await Livraison.findByIdAndDelete(req.params.id);
    if (!livraison) {
      return res.status(404).json({ message: 'Livraison non trouvée' });
    }
    res.json({ message: 'Livraison supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: error.message });
  }
};

// Suivre le statut d'une livraison
const suivreStatutLivraison = async (req, res) => {
  try {
    const livraison = await Livraison.findById(req.params.id);
    if (!livraison) {
      return res.status(404).json({ message: 'Livraison non trouvée' });
    }
    const statut = livraison.suivreStatut();
    res.json(statut);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors du suivi', error: error.message });
  }
};

// Confirmer une livraison
const confirmerLivraison = async (req, res) => {
  try {
    const livraison = await Livraison.findById(req.params.id);
    if (!livraison) {
      return res.status(404).json({ message: 'Livraison non trouvée' });
    }
    await livraison.confirmerLivraison(req.body.signature);

    // Mettre à jour le statut de la commande
    await Commande.findByIdAndUpdate(
      livraison.commande,
      { statutCommande: 'livrée' }
    );

    res.json({ message: 'Livraison confirmée avec succès' });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la confirmation', error: error.message });
  }
};

module.exports = {
  getLivraisons,
  getLivraisonById,
  createLivraison,
  updateLivraison,
  deleteLivraison,
  suivreStatutLivraison,
  confirmerLivraison
};
