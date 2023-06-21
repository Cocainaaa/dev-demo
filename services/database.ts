import { createConnection, Connection } from 'mysql2/promise';

export let connection: Connection;

export const connectToDatabase = (): Promise<Connection> => {
  return createConnection({
    host: 'localhost',
    user: 'root',
    password: '0060',
    port : 3307
  })
    .then((conn) => {
      connection = conn;
      console.log('Connexion à la base de données réussie');
      return conn;
    })
    .catch((error) => {
      console.error('Erreur lors de la connexion à la base de données :', error);
      throw error;
    });
};

export const createDatabase = (): Promise<void> => {
  return connection.execute('CREATE DATABASE IF NOT EXISTS products')
    .then(() => {
      console.log('Base de données "products" créée avec succès');
    })
    .catch((error) => {
      console.error('Erreur lors de la création de la base de données :', error);
      throw error;
    });
};

export const createProductsTable = (): Promise<void> => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nomClient VARCHAR(255),
      prenomClient VARCHAR(255),
      nomProduit VARCHAR(255),
      prix DECIMAL(10, 2)
    )
  `;

  return connection.execute(createTableQuery)
    .then(() => {
      console.log('Table "products" créée avec succès');
    })
    .catch((error) => {
      console.error('Erreur lors de la création de la table :', error);
      throw error;
    });
};
