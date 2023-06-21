import { Request, Response } from 'express';
import {
  obtenirTousLesProduits,
  obtenirProduitParId,
  ajouterProduit,
  mettreAJourPrixProduit,
  supprimerProduit
} from '../services/services';

export const obtenirTousLesProduitsHandler = async (req: Request, res: Response) => {
  try {
    const produits = await obtenirTousLesProduits();
    res.json(produits);
  } catch (err) {
    console.error('Erreur lors de la récupération des produits :', err);
    res.status(500).send('Une erreur est survenue lors de la récupération des produits');
  }
};

export const obtenirProduitParIdHandler = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    res.status(400).send('ID de produit invalide');
    return;
  }

  try {
    const idProduit = Number(id);
    const produit = await obtenirProduitParId(idProduit);
    if (produit) {
      res.json(produit);
    } else {
      res.status(404).send('Le produit demandé n\'a pas été trouvé');
    }
  } catch (err) {
    console.error('Erreur lors de la récupération du produit :', err);
    res.status(500).send('Une erreur est survenue lors de la récupération du produit');
  }
};

export const ajouterProduitHandler = async (req: Request, res: Response) => {
  const donneesProduit = req.body;
  try {
    const idInsertion = await ajouterProduit(donneesProduit);
    res.json({ id: idInsertion });
  } catch (err) {
    console.error('Erreur lors de l\'ajout du produit :', err);
    res.status(500).send('Une erreur est survenue lors de l\'ajout du produit');
  }
};

export const mettreAJourPrixProduitHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nouveauPrix } = req.body;
  if (!isValidId(id)) {
    res.status(400).send('ID de produit invalide');
    return;
  }

  try {
    const idProduit = Number(id);
    await mettreAJourPrixProduit(idProduit, nouveauPrix);
    res.status(200).send('Le prix du produit a été mis à jour avec succès');
  } catch (err: any) {
    console.error('Erreur lors de la mise à jour du prix du produit :', err);
    if (typeof err.message === 'string' && err.message === 'Produit non trouvé') {
      res.status(404).send('Le produit demandé n\'a pas été trouvé');
    } else {
      res.status(500).send('Une erreur est survenue lors de la mise à jour du prix du produit');
    }
  }
};

export const supprimerProduitHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    res.status(400).send('ID de produit invalide');
    return;
  }

  try {
    const idProduit = Number(id);
    await supprimerProduit(idProduit);
    res.status(200).send('Le produit a été supprimé avec succès');
  } catch (err: any) {
    console.error('Erreur lors de la suppression du produit :', err);
    if (typeof err.message === 'string' && err.message === 'Produit non trouvé') {
      res.status(404).send('Le produit demandé n\'a pas été trouvé');
    } else {
      res.status(500).send('Une erreur est survenue lors de la suppression du produit');
    }
  }
};

// Vérifie si l'ID est un nombre valide
const isValidId = (id: string): boolean => {
  return !isNaN(Number(id));
};
