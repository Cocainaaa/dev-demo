import { Request, Response,NextFunction  } from 'express';
import { FindOneOptions } from 'typeorm';
import { myDataSource } from '../../../app-data-source';
import { Produit } from '../produit.entity';
import { check, validationResult } from 'express-validator';
import { createUserAndGenerateToken } from './authen';

export async function handleLogin(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    // Créez un nouvel utilisateur et générez le token
    const token = await createUserAndGenerateToken(username, password);
    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// Fonction pour obtenir tous les produits
export async function getProduits(req: Request, res: Response) {
  const produits = await myDataSource.getRepository(Produit).find();
  res.json(produits);
}
// Fonction pour obtenir un produit par son ID
export async function getProduitByID(req: Request, res: Response) {
  const id: number = parseInt(req.params.id, 10);
  const options: FindOneOptions<Produit> = {
    where: { id },
  };
  const produit = await myDataSource
    .getRepository(Produit)
    .findOne(options);
  if (produit) {
    res.json(produit);
  } else {
    res.sendStatus(404);
  }
}
// Fonction pour ajouter un produit
export async function addProduit(req: Request, res: Response) {
  // Utilisation d'Express Validator pour valider les champs
  await Promise.all([
    check('prix')
      .notEmpty().withMessage('Le prix ne peut pas être vide.')
      .isFloat({ min: 0 }).withMessage('Le prix doit être supérieur ou égal à 0.')
      .run(req),
    check('nomClient')
      .notEmpty().withMessage('Le nom du client ne peut pas être vide.')
      .run(req),
    check('nomProduit')
      .notEmpty().withMessage('Le nom du produit ne peut pas être vide.')
      .run(req)
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const produit = myDataSource.getRepository(Produit).create(req.body);
  const results = await myDataSource.getRepository(Produit).save(produit);
  return res.send(results);
}

// Fonction pour définir le prix d'un produit
export async function setPrix(req: Request, res: Response) {
  const { id } = req.params;
  const { prix } = req.body;

  // Utilisation d'Express Validator pour valider le prix
  await check('prix')
    .notEmpty().withMessage('Le prix ne peut pas être vide.')
    .isFloat({ gt: 0 }).withMessage('Le prix doit être un nombre positif.')
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  await myDataSource.getRepository(Produit).update(id, { prix });
  res.sendStatus(200);
}

// Fonction pour supprimer un produit
export async function deleteProduit(req: Request, res: Response) {
  const results = await myDataSource
    .getRepository(Produit)
    .delete(req.params.id);
  return res.send(results);
}



