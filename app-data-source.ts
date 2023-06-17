import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "mariadb",               // Type de base de données
    host: "localhost",           // Hôte de la base de données 
    port: 3307,                  // Port utilisé par la base de données
    username: "root",            // Nom d'utilisateur pour la connexion à la base de données
    password: "00600060",        // Mot de passe pour la connexion à la base de données
    database: "tp_produit",      // Nom de la base de données
    entities: ["src/entity/*.ts"],// Chemin des fichiers d'entités TypeScript
    //logging: true,               // Activation des journaux de requêtes SQL
    synchronize: true,           // Synchronisation automatique des schémas (création des tables, etc.)
})

