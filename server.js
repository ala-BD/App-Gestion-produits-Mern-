// ✅ server.js mis à jour avec la route des alertes de stock
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connexion MongoDB réussie'))
.catch(err => console.error('❌ Erreur MongoDB :', err));

// ✅ Importation des routes
const userRoutes = require('./routes/userRoutes');
const rapportRoutes = require('./routes/rapportRoutes');
const produitRoutes = require('./routes/produitRoutes');
const livraisonRoutes = require('./routes/livraisonRoutes');
const commandeRoutes = require('./routes/commandeRoutes');
const categorieRoutes = require('./routes/categorieRoutes');
const clientRoutes = require('./routes/clientRoutes');
const adminRoutes = require('./routes/adminRoutes');
const alerteRoutes = require('./routes/alerteStockRoutes');  
const fournisseurRoutes = require('./routes/fournisseurRoutes');
const ligneCommandeRoutes = require('./routes/ligneCommandeRoutes');

// ✅ Route de test
app.get('/', (req, res) => {
  res.send('🚀 Backend opérationnel');
});

// ✅ Utilisation des routes API
app.use('/api/users', userRoutes);
app.use('/api/rapports', rapportRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/livraisons', livraisonRoutes);
app.use('/api/commandes', commandeRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/alertes', alerteRoutes); 
app.use('/api/fournisseurs', fournisseurRoutes);
app.use('/api/lignesCommandes', ligneCommandeRoutes);



// ✅ Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ message: '❌ Route non trouvée' });
});

// ✅ Gestion des erreurs serveur
app.use((err, req, res, next) => {
  console.error('❌ Stack error:', err.stack);
  res.status(500).json({ message: 'Erreur serveur', error: err.message });
});

// ✅ Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
