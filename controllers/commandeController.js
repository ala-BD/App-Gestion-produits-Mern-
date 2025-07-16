const Commande = require('../models/Commande');
const Client = require('../models/Client');

// Obtenir toutes les commandes
const getCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find()
      .populate('client')
      .populate('lignesCommande.produit');
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Obtenir une commande par ID
const getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id)
      .populate('client')
      .populate('lignesCommande.produit');
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    res.json(commande);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Créer une commande
const createCommande = async (req, res) => {
  try {
    const {
      numeroCommande,
      client,
      lignesCommande,
      totalCommande,
      taxesAppliquees,
      adresseLivraison,
      modePaiement
    } = req.body;

    // Vérifier si la commande existe déjà
    const existingCommande = await Commande.findOne({ numeroCommande });
    if (existingCommande) {
      return res.status(400).json({ message: 'Une commande avec ce numéro existe déjà.' });
    }

    // Créer une nouvelle commande
    const newCommande = new Commande({
      numeroCommande,
      client,
      lignesCommande,
      totalCommande,
      taxesAppliquees,
      adresseLivraison,
      modePaiement
    });

    // Sauvegarder la commande
    await newCommande.save();

    // Mettre à jour l'historique des commandes du client
    await Client.findByIdAndUpdate(
      client,
      { $push: { historiqueCommandes: newCommande._id } }
    );

    res.status(201).json({ message: 'Commande créée avec succès.', commande: newCommande });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

// Mettre à jour une commande
const updateCommande = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    res.json(commande);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
};

// Supprimer une commande
const deleteCommande = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndDelete(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    // Retirer la commande de l'historique du client
    await Client.findByIdAndUpdate(
      commande.client,
      { $pull: { historiqueCommandes: commande._id } }
    );

    res.json({ message: 'Commande supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: error.message });
  }
};

// Changer le statut d'une commande
const updateStatutCommande = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    // Supposons que la méthode changerStatut est définie dans ton modèle Commande
    await commande.changerStatut(req.body.statut);

    res.json(commande);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors du changement de statut', error: error.message });
  }
};

// Annuler une commande
const annulerCommande = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    // Supposons que la méthode annulerCommande est définie dans ton modèle Commande
    await commande.annulerCommande();

    res.json({ message: 'Commande annulée avec succès' });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de l\'annulation', error: error.message });
  }
};

module.exports = {
  getCommandes,
  getCommandeById,
  createCommande,
  updateCommande,
  deleteCommande,
  updateStatutCommande,
  annulerCommande
};
