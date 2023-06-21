"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controller_1 = require("../controllers/controller");
const router = express.Router();
// Récupérer tous les produits
router.get('/produits', controller_1.obtenirTousLesProduitsHandler);
// Récupérer un produit par ID
router.get('/produits/:id', controller_1.obtenirProduitParIdHandler);
// Ajouter un nouveau produit
router.post('/produits', controller_1.ajouterProduitHandler);
// Modifier le prix d'un produit
router.put('/produits/:id', controller_1.mettreAJourPrixProduitHandler);
// Supprimer un produit
router.delete('/produits/:id', controller_1.supprimerProduitHandler);
exports.default = router;
