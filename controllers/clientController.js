const Client = require('../models/Client');
const bcrypt = require('bcryptjs');

// 🔹 Créer un client
const createClient = async (req, res) => {
  try {
    const { nom, prenom, email, mdp, adresse, role } = req.body;

    if (role !== 'client') {
      return res.status(400).json({ message: 'Le rôle doit être "client"' });
    }

    const existingUser = await Client.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    const client = new Client({ nom, prenom, email, mdp, adresse, role });
    await client.save();

    res.status(201).json({ message: 'Client créé avec succès', client });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// 🔹 Obtenir tous les clients
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({ role: 'client' });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// 🔹 Obtenir un client par ID
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client || client.role !== 'client') {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// 🔹 Mettre à jour un client
const updateClient = async (req, res) => {
  try {
    const { nom, prenom, email, mdp, adresse, statut } = req.body;
    const client = await Client.findById(req.params.id);

    if (!client || client.role !== 'client') {
      return res.status(404).json({ message: 'Client non trouvé' });
    }

    client.nom = nom || client.nom;
    client.prenom = prenom || client.prenom;
    client.email = email || client.email;
    client.adresse = adresse || client.adresse;
    client.statut = statut || client.statut;

    if (mdp) {
      client.mdp = await bcrypt.hash(mdp, 12);
    }

    await client.save();
    res.json({ message: 'Client mis à jour', client });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// 🔹 Supprimer un client
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client || client.role !== 'client') {
      return res.status(404).json({ message: 'Client non trouvé' });
    }

    await client.deleteOne();
    res.json({ message: 'Client supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
};
