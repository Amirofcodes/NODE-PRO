# Gestion d'Articles et Utilisateurs

## Description du Projet

Ce projet est une application web full-stack développée avec Node.js dans le cadre d'un cours pour débutants. L'application permet la gestion d'utilisateurs et d'articles, offrant une interface utilisateur simple et fonctionnelle.

## Fonctionnalités Principales

- Création de compte utilisateur (inscription)
- Connexion utilisateur
- Création d'articles
- Visualisation de la liste des articles (vues liste et grille)
- Visualisation détaillée d'un article spécifique
- Déconnexion utilisateur

## Structure du Projet

Le projet est divisé en deux parties principales :

### Backend (Serveur)

- `server.js` : Point d'entrée de l'application
- `db.js` : Configuration de la connexion à la base de données MongoDB
- `routes/` : Dossier contenant les routes de l'API (auth.js, articles.js, userData.js)
- `models/` : Définitions des modèles de données (User.js et Article.js)
- `middleware/auth.js` : Middleware d'authentification

### Frontend (Client)

- `public/index.html` : Structure HTML de base
- `public/style.css` : Styles CSS pour l'interface utilisateur
- `public/app.js` : Logique JavaScript côté client

## Technologies Utilisées

- **Backend** :

  - Node.js
  - Express.js
  - MongoDB avec Mongoose
  - JSON Web Tokens (JWT) pour l'authentification

- **Frontend** :
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Fetch API pour les requêtes AJAX

## Fonctionnalités Détaillées

1. **Gestion des Utilisateurs** :

   - Inscription sécurisée avec hachage des mots de passe
   - Authentification par token JWT
   - Gestion de session côté client

2. **Gestion des Articles** :

   - Création d'articles avec titre, description, prix, et quantité
   - Affichage des articles en vue liste ou grille
   - Vue détaillée pour chaque article

3. **Interface Utilisateur** :
   - Design responsive
   - Navigation fluide entre les différentes vues
   - Affichage conditionnel des éléments basé sur l'état de connexion

## Sécurité

- Hachage des mots de passe avec bcryptjs
- Protection des routes sensibles par authentification JWT
- Utilisation de variables d'environnement pour les informations sensibles

## Défis Techniques Surmontés

- Gestion de l'état global côté client (token d'authentification)
- Implémentation de vues conditionnelles
- Mise en place d'une navigation dynamique sans rechargement de page

## Perspectives d'Amélioration

- Ajout des fonctionnalités de modification et suppression d'articles
- Implémentation de la recherche et du filtrage des articles
- Mise en place de tests unitaires et d'intégration
- Optimisation des performances (mise en cache, pagination)

## À Propos

Ce projet a été développé dans le cadre d'un cours de Node.js pour débutants, démontrant l'application pratique des concepts full-stack dans le développement web moderne.
