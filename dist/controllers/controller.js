"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supprimerProduitHandler = exports.mettreAJourPrixProduitHandler = exports.ajouterProduitHandler = exports.obtenirProduitParIdHandler = exports.obtenirTousLesProduitsHandler = void 0;
const services_1 = require("../services/services");
const obtenirTousLesProduitsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const produits = yield (0, services_1.obtenirTousLesProduits)();
        res.json(produits);
    }
    catch (err) {
        console.error('Erreur lors de la récupération des produits :', err);
        res.status(500).send('Une erreur est survenue lors de la récupération des produits');
    }
});
exports.obtenirTousLesProduitsHandler = obtenirTousLesProduitsHandler;
const obtenirProduitParIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!isValidId(id)) {
        res.status(400).send('ID de produit invalide');
        return;
    }
    try {
        const idProduit = Number(id);
        const produit = yield (0, services_1.obtenirProduitParId)(idProduit);
        if (produit) {
            res.json(produit);
        }
        else {
            res.status(404).send('Le produit demandé n\'a pas été trouvé');
        }
    }
    catch (err) {
        console.error('Erreur lors de la récupération du produit :', err);
        res.status(500).send('Une erreur est survenue lors de la récupération du produit');
    }
});
exports.obtenirProduitParIdHandler = obtenirProduitParIdHandler;
const ajouterProduitHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const donneesProduit = req.body;
    try {
        const idInsertion = yield (0, services_1.ajouterProduit)(donneesProduit);
        res.json({ id: idInsertion });
    }
    catch (err) {
        console.error('Erreur lors de l\'ajout du produit :', err);
        res.status(500).send('Une erreur est survenue lors de l\'ajout du produit');
    }
});
exports.ajouterProduitHandler = ajouterProduitHandler;
const mettreAJourPrixProduitHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nouveauPrix } = req.body;
    if (!isValidId(id)) {
        res.status(400).send('ID de produit invalide');
        return;
    }
    try {
        const idProduit = Number(id);
        yield (0, services_1.mettreAJourPrixProduit)(idProduit, nouveauPrix);
        res.status(200).send('Le prix du produit a été mis à jour avec succès');
    }
    catch (err) {
        console.error('Erreur lors de la mise à jour du prix du produit :', err);
        if (typeof err.message === 'string' && err.message === 'Produit non trouvé') {
            res.status(404).send('Le produit demandé n\'a pas été trouvé');
        }
        else {
            res.status(500).send('Une erreur est survenue lors de la mise à jour du prix du produit');
        }
    }
});
exports.mettreAJourPrixProduitHandler = mettreAJourPrixProduitHandler;
const supprimerProduitHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!isValidId(id)) {
        res.status(400).send('ID de produit invalide');
        return;
    }
    try {
        const idProduit = Number(id);
        yield (0, services_1.supprimerProduit)(idProduit);
        res.status(200).send('Le produit a été supprimé avec succès');
    }
    catch (err) {
        console.error('Erreur lors de la suppression du produit :', err);
        if (typeof err.message === 'string' && err.message === 'Produit non trouvé') {
            res.status(404).send('Le produit demandé n\'a pas été trouvé');
        }
        else {
            res.status(500).send('Une erreur est survenue lors de la suppression du produit');
        }
    }
});
exports.supprimerProduitHandler = supprimerProduitHandler;
// Vérifie si l'ID est un nombre valide
const isValidId = (id) => {
    return !isNaN(Number(id));
};
