import cors from "cors"; // Middleware pour gérer les requêtes CORS
import express from "express";
import { myDataSource } from "./app-data-source"; 
import router from "./src/entity/routes/routes"; 
const bodyParser = require('body-parser') 
const app = express(); // Création de l'application Express

app.use(cors());
app.use(bodyParser.json()); // Utilisation du middleware bodyParser pour analyser le corps des requêtes au format JSON

// Connexion avec la base de données
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(8000, () => {
      console.log("Server started on port 8000");
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.use("/",router); // Utilisation des routes définies dans le fichier router.js pour les URL commençant par "/"

export default app; // Exportation de l'application Express pour pouvoir l'utiliser dans d'autres fichiers
