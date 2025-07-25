const Admin = require('../models/Admin');

// GET - Tous les admins
exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// GET - Admin par ID
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Admin non trouvé' });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// POST - Créer un nouvel admin
exports.createAdmin = async (req, res) => {
  try {
    // Attention : il faut bien vérifier que le role est 'admin'
    const { nom, prenom, email, mdp, adresse, statut, role, permissions } = req.body;
    if (role !== 'admin') {
      return res.status(400).json({ message: 'Le rôle doit être "admin"' });
    }

    const newAdmin = new Admin({
      nom,
      prenom,
      email,
      mdp,
      adresse,
      statut,
      role,
      permissions
    });

    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    // Gestion des erreurs de doublons, etc.
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// PUT - Mettre à jour un admin
exports.updateAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const updateData = req.body;

    // Si mot de passe modifié, le hash se fera via le hook pre('save')
    let admin = await Admin.findById(adminId);
    if (!admin) return res.status(404).json({ message: 'Admin non trouvé' });

    // Mise à jour champs
    Object.assign(admin, updateData);

    await admin.save();

    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// DELETE - Supprimer un admin
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Admin non trouvé' });
    res.json({ message: 'Admin supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
