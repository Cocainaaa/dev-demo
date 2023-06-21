"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductsTable = exports.connectToDatabase = exports.connection = void 0;
const promise_1 = require("mysql2/promise");
const connectToDatabase = () => {
    return (0, promise_1.createConnection)({
        host: 'localhost',
        user: 'root',
        password: '0060',
        database: 'products', // Ajout de la base de données ici
    })
        .then((conn) => {
        exports.connection = conn;
        console.log('Connexion à la base de données réussie');
        return conn;
    })
        .catch((error) => {
        console.error('Erreur lors de la connexion à la base de données :', error);
        throw error;
    });
};
exports.connectToDatabase = connectToDatabase;
const createProductsTable = () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nomClient VARCHAR(255),
      prenomClient VARCHAR(255),
      nomProduit VARCHAR(255),
      prix DECIMAL(10, 2)
    )
  `;
    return exports.connection.execute(createTableQuery)
        .then(() => {
        console.log('Table "products" créée avec succès');
    })
        .catch((error) => {
        console.error('Erreur lors de la création de la table :', error);
        throw error;
    });
};
exports.createProductsTable = createProductsTable;
