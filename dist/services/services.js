"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supprimerProduit = exports.mettreAJourPrixProduit = exports.ajouterProduit = exports.obtenirProduitParId = exports.obtenirTousLesProduits = void 0;
const database_1 = require("./database");
const obtenirTousLesProduits = () => {
    return new Promise((resolve, reject) => {
        database_1.connection
            .execute('SELECT * FROM products')
            .then(([rows]) => resolve(rows))
            .catch(reject);
    });
};
exports.obtenirTousLesProduits = obtenirTousLesProduits;
const obtenirProduitParId = (id) => {
    return new Promise((resolve, reject) => {
        database_1.connection
            .execute('SELECT * FROM products WHERE id = ?', [id])
            .then(([rows]) => {
            if (rows.length === 0) {
                reject(new Error('Produit non trouvé'));
                return;
            }
            resolve(rows[0]);
        })
            .catch(reject);
    });
};
exports.obtenirProduitParId = obtenirProduitParId;
const ajouterProduit = (donneesProduit) => {
    return new Promise((resolve, reject) => {
        database_1.connection
            .execute('INSERT INTO products (nomClient, prenomClient, nomProduit, prix) VALUES (?, ?, ?, ?)', [donneesProduit.nomClient, donneesProduit.prenomClient, donneesProduit.nomProduit, donneesProduit.prix])
            .then(([result]) => resolve(result.insertId))
            .catch(reject);
    });
};
exports.ajouterProduit = ajouterProduit;
const mettreAJourPrixProduit = (id, nouveauPrix) => {
    return new Promise((resolve, reject) => {
        database_1.connection
            .execute('UPDATE products SET prix = ? WHERE id = ?', [nouveauPrix, id])
            .then(([result]) => {
            if (result.affectedRows === 0) {
                reject(new Error('Produit non trouvé'));
                return;
            }
            resolve();
        })
            .catch(reject);
    });
};
exports.mettreAJourPrixProduit = mettreAJourPrixProduit;
const supprimerProduit = (id) => {
    return new Promise((resolve, reject) => {
        database_1.connection
            .execute('DELETE FROM products WHERE id = ?', [id])
            .then(([result]) => {
            if (result.affectedRows === 0) {
                reject(new Error('Produit non trouvé'));
                return;
            }
            resolve();
        })
            .catch(reject);
    });
};
exports.supprimerProduit = supprimerProduit;
