const Produit = require('../models/Produit');

// Obtenir tous les produits
const getProduits = async (req, res) => {
  try {
    const produits = await Produit.find().populate('categorie');
    res.json(produits);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Obtenir un produit par ID
const getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id).populate('categorie');
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(produit);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Créer un produit
const createProduit = async (req, res) => {
  try {
    const { nom, description, prix, quantiteStock, typeProduit, imageURL, categorie } = req.body;

    const existingProduit = await Produit.findOne({ nom });
    if (existingProduit) {
      return res.status(400).json({ message: 'Un produit avec ce nom existe déjà.' });
    }

    const newProduit = new Produit({
      nom,
      description,
      prix,
      quantiteStock,
      typeProduit,
      imageURL,
      categorie
    });

    await newProduit.save();
    res.status(201).json({ message: 'Produit créé avec succès.', produit: newProduit });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

// Mettre à jour un produit
const updateProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(produit);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
};

// Supprimer un produit
const deleteProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndDelete(req.params.id);
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: error.message });
  }
};

// Mettre à jour le stock
const updateStock = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    const { quantite } = req.body;
    await produit.mettreAJourStock(quantite);
    res.json({ message: 'Stock mis à jour', produit });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du stock', error: error.message });
  }
};

module.exports = {
  getProduits,
  getProduitById,
  createProduit,
  updateProduit,
  deleteProduit,
  updateStock
};
