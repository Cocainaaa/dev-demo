# Nom du Projet

## Description

Ce projet est une application ORM (Object-Relational Mapping) développée en TypeScript avec Express. Il permet de créer, lire, mettre à jour et supprimer des données à partir d'une base de données relationnelle.

L'application expose une API RESTful qui peut être utilisée pour interagir avec les ressources de la base de données.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- Node.js (version X.X.X)
- npm (version X.X.X)
- Base de données relationnelle (Maria)

## Installation

1. Clonez ce référentiel sur votre machine locale.

- git clone https://github.com/votre_utilisateur/votre_projet.git


2. Accédez au répertoire du projet.
- cd votre_projet


3. Installez les dépendances nécessaires.
- npm install


4. Configurez les variables d'environnement.

- Créez un fichier `.env` à la racine du projet.
- Ajoutez les variables d'environnement nécessaires, par exemple :

  ```
  PORT=8000
  DATABASE_URL=mysql://utilisateur:mot_de_passe@localhost:3307/nom_base_de_donnees
  ```

5. Démarrez l'application.

- npm start


L'application sera accessible à l'adresse [http://localhost:8000](http://localhost:8000).

## Utilisation

- Endpoint 1 : [GET] /api/ressource
- Description : Récupère toutes les ressources de la base de données.
- Paramètres : Aucun.
- Réponse : Un tableau JSON contenant toutes les ressources.

- Endpoint 2 : [POST] /api/ressource
- Description : Crée une nouvelle ressource dans la base de données.
- Paramètres : Un objet JSON contenant les détails de la ressource à créer.
- Réponse : L'objet JSON de la ressource créée.

- Endpoint 3 : [PUT] /api/ressource/:id
- Description : Met à jour une ressource existante dans la base de données.
- Paramètres : L'identifiant de la ressource à mettre à jour dans l'URL et un objet JSON contenant les nouvelles valeurs.
- Réponse : L'objet JSON de la ressource mise à jour.

- Endpoint 4 : [DELETE] /api/ressource/:id
- Description : Supprime une ressource existante de la base de données.
- Paramètres : L'identifiant de la ressource à supprimer dans l'URL.
- Réponse : Un message de confirmation de la suppression.









