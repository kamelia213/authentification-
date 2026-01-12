# Authentification node

Mini-projet d'authentification (TP) avec Express, EJS et MongoDB Atlas.

## Description
Ce projet montre un flux d'authentification simple avec pages EJS, stockage des utilisateurs dans MongoDB et hachage des mots de passe avec bcrypt. Le front (formulaires) est servi depuis `public` et les vues sont dans `src/views`.

## Fonctionnalites
- Page de connexion `/` (formulaire login)
- Page d'inscription `/signup` (formulaire signup)
- Creation d'un utilisateur avec mot de passe hashe (POST `/signup`)
- Verification du mot de passe au login (POST `/login`)
- Session basique en memoire pour garder l'utilisateur connecte
- Deconnexion via POST `/logout`
- Affichage d'une page d'accueil en cas de succes (`/home`)

## Parcours utilisateur (resume)
1. L'utilisateur s'inscrit avec un nom + mot de passe.
2. Le serveur verifie si le nom existe, puis hash le mot de passe (bcrypt) et enregistre l'utilisateur.
3. L'utilisateur se connecte: on compare le mot de passe saisi avec le hash stocke.
4. Si ok, une session est creee et la page `home` est rendue.
5. L'utilisateur peut se deconnecter avec `/logout`.

## Limites actuelles (a connaitre)
- Session en memoire (pas adaptee a la production).
- Pas de validations avancees (format, longueur, etc.).
- Pas de protection contre bruteforce/CSRF.

## Prerequis
- Node.js (version recente)
- Un compte MongoDB Atlas

## Installation
```bash
npm install
```

## Configuration
1. Copie le fichier `.env.example` en `.env`.
2. Remplace les valeurs par les tiennes :
```
MONGO_URI=mongodb+srv://<USER>:<PASSWORD>@authentificate.1je7mxg.mongodb.net/auth_demo?retryWrites=true&w=majority
PORT=5000
SESSION_SECRET=change_this_secret
```

## Lancer le projet
```bash
npm run dev
```

Ouvre ensuite `http://localhost:5000`.
