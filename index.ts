import express from 'express';
import produitsRoutes from './routes/routes';
import { connectToDatabase, createDatabase, createProductsTable } from './services/database';
import cors from 'cors';

const app = express();
const port = 8000;

// Connexion à la base de données
connectToDatabase()
  .then((conn) => {
    console.log('Connexion à la base de données établie');
    return createDatabase(); // Crée la base de données si elle n'existe pas
  })
  .then(() => {
    return createProductsTable(); // Crée la table "products" si elle n'existe pas
  })
  .then(() => {
    // Configurer les middlewares et les routes
    app.use(express.json());
    app.use(cors());
    app.use('/', produitsRoutes);

    // Démarrer le serveur
    app.listen(port, () => {
      console.log(`Le serveur est en écoute sur le port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Erreur lors de la connexion à la base de données :', error);
  });
