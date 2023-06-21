"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const database_1 = require("./services/database");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8000;
//Connexion à la base de données
(0, database_1.connectToDatabase)()
    .then(() => {
    console.log('Connexion à la base de données établie');
    //Les routes
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use('/', routes_1.default);
    //Commencer le serveur
    app.listen(port, () => {
        console.log(`Le serveur est en écoute sur le port ${port}`);
    });
})
    .catch((error) => {
    console.error('Erreujbiubr lors de la connexion à la base de données :', error);
});
