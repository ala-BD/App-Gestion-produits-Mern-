const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import des routes
const userRoutes = require('./routes/userRoutes');
const produitRoutes = require('./routes/produitRoutes');
const categorieRoutes = require('./routes/categorieRoutes');
const commandeRoutes = require('./routes/commandeRoutes');
const livraisonRoutes = require('./routes/livraisonRoutes');
const rapportRoutes = require('./routes/rapportRoutes');
const alerteStockRoutes = require('./routes/alerteStockRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.log('Erreur de connexion MongoDB:', err));

// Route de base
app.get('/', (req, res) => res.send('Backend opérationnel'));

// Routes API
app.use('/api/users', userRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/commandes', commandeRoutes);
app.use('/api/livraisons', livraisonRoutes);
app.use('/api/rapports', rapportRoutes);
app.use('/api/alertes-stock', alerteStockRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Erreur serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
