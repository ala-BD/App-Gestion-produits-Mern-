const Categorie = require('../models/Categorie');

// Obtenir toutes les catégories
const getCategories = async (req, res) => {
  try {
    const categories = await Categorie.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Obtenir une catégorie par ID
const getCategorieById = async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id);
    if (!categorie) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.json(categorie);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Créer une catégorie
const createCategorie = async (req, res) => {
  try {
    const { nomCategorie, descriptionCategorie, typeCategorie, imageCategorie } = req.body;

    // Vérifier si la catégorie existe déjà
    const existingCategorie = await Categorie.findOne({ nomCategorie });
    if (existingCategorie) {
      return res.status(400).json({ message: 'Une catégorie avec ce nom existe déjà.' });
    }

    // Créer une nouvelle catégorie
    const newCategorie = new Categorie({
      nomCategorie,
      descriptionCategorie,
      typeCategorie,
      imageCategorie
    });

    // Sauvegarder la catégorie
    await newCategorie.save();

    res.status(201).json({ message: 'Catégorie créée avec succès.', categorie: newCategorie });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Mettre à jour une catégorie
const updateCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!categorie) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.json(categorie);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
};

// Supprimer une catégorie
const deleteCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndDelete(req.params.id);
    if (!categorie) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.json({ message: 'Catégorie supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: error.message });
  }
};

// Obtenir les produits d'une catégorie
const getProduitsByCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id);
    if (!categorie) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    const produits = await categorie.listerProduitsParCategorie();
    res.json(produits);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

module.exports = {
  getCategories,
  getCategorieById,
  createCategorie,
  updateCategorie,
  deleteCategorie,
  getProduitsByCategorie
}; 