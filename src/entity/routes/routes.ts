import express, { Request, Response, NextFunction } from 'express';
import {
  getProduits,
  getProduitByID,
  addProduit,
  setPrix,
  deleteProduit,
  handleLogin,
} from '../services/services';
import { authenticateToken, createUserAndGenerateToken } from '../services/authen';

const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());

router.post('/login', handleLogin);

// Middleware global pour vérifier le jeton JWT sur toutes les routes
router.use(authenticateToken);

// Route pour obtenir tous les produits
router.get('/produits', getProduits);

// Route pour obtenir un produit par son ID
router.get('/produits/:id', getProduitByID);

// Route pour ajouter un produit
router.post('/produits', addProduit);

// Route pour définir le prix d'un produit
router.put('/produits/:id', setPrix);

// Route pour supprimer un produit
router.delete('/produits/:id', deleteProduit);


export default router;


