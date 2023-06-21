import { connection } from './database';

export const obtenirTousLesProduits = (): Promise<any[]> => {
  return new Promise<any[]>((resolve, reject) => {
    connection
      .execute('SELECT * FROM products')
      .then(([rows]) => resolve(rows as any[]))
      .catch(reject);
  });
};

export const obtenirProduitParId = (id: number): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    connection
      .execute('SELECT * FROM products WHERE id = ?', [id])
      .then(([rows]) => {
        if ((rows as any[]).length === 0) {
          reject(new Error('Produit non trouvé'));
          return;
        }
        resolve((rows as any[])[0]);
      })
      .catch(reject);
  });
};

export const ajouterProduit = (donneesProduit: {
  nomClient: string;
  prenomClient: string;
  nomProduit: string;
  prix: number;
}): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    connection
      .execute(
        'INSERT INTO products (nomClient, prenomClient, nomProduit, prix) VALUES (?, ?, ?, ?)',
        [donneesProduit.nomClient, donneesProduit.prenomClient, donneesProduit.nomProduit, donneesProduit.prix]
      )
      .then(([result]) => resolve((result as any).insertId))
      .catch(reject);
  });
};

export const mettreAJourPrixProduit = (id: number, nouveauPrix: number): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    connection
      .execute('UPDATE products SET prix = ? WHERE id = ?', [nouveauPrix, id])
      .then(([result]) => {
        if ((result as any).affectedRows === 0) {
          reject(new Error('Produit non trouvé'));
          return;
        }
        resolve();
      })
      .catch(reject);
  });
};

export const supprimerProduit = (id: number): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    connection
      .execute('DELETE FROM products WHERE id = ?', [id])
      .then(([result]) => {
        if ((result as any).affectedRows === 0) {
          reject(new Error('Produit non trouvé'));
          return;
        }
        resolve();
      })
      .catch(reject);
  });
};