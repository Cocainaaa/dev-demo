import express = require('express');
import {
  obtenirTousLesProduitsHandler,
  obtenirProduitParIdHandler,
  ajouterProduitHandler,
  mettreAJourPrixProduitHandler,
  supprimerProduitHandler
} from '../controllers/controller';

const router = express.Router();

// Récupérer tous les produits
router.get('/produits', obtenirTousLesProduitsHandler);

// Récupérer un produit par ID
router.get('/produits/:id', obtenirProduitParIdHandler);

// Ajouter un nouveau produit
router.post('/produits', ajouterProduitHandler);

// Modifier le prix d'un produit
router.put('/produits/:id', mettreAJourPrixProduitHandler);

// Supprimer un produit
router.delete('/produits/:id', supprimerProduitHandler);

export default router;
