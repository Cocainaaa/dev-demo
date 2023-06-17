import cors from "cors";
import express from "express";
import { myDataSource } from "./app-data-source";
import router from "./src/entity/routes/routes";
const bodyParser = require('body-parser')
const app = express();
app.use(cors())
app.use(bodyParser.json());
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
app.use("/",router); //Utilisation des routes 
export default app;