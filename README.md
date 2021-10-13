# Projet de cours OpenClassrooms So Pekocko  
Projet de formation développeur web  
## Langages & technologies utilisés
* JAVASCRIPT
* NODE.js
* EXPRESS.js
* MongoDB  

## Instruction  
Le but est de réaliser l'API complète d'une application d'évaluation de sauce piquante de l'entreprise So Pekocko.  
Le Frontend est fourni pour le projet, il est développé avec le framework Angular.  
Le backend doit être entièrement fait avec Node et Express, et les routes CRUD sont à développer.  
L'Api doit également être sécurisé, et les données des utilisateurs protégées.  

 ## Installation du Frontend  

* Il faut cloner ce projet GitHub, et l'ouvrir dans l'IDE.  
* Dans le terminal, taper `cd frontend`.  
* Ensuite exécuter les commandes `npm install` & `npm install node-sass` pour installer les dépendances.  
* *Attention le projet est généré avec la version 7.0.2 de Angular CLI.* 
* Démarrer le frontend avec `ng serve`, le projet s'affiche normalement sur http://localhost:4200.

## Installation du Backend  

* Dans le terminal, taper `cd backend`.  
* Ensuite exécuter les commandes `npm install` & `npm install nodemon` pour installer les dépendances et Nodemon.   
* Démarrer le backend avec `nodemon server`.  

### Pour des raisons de sécurité  
Dans le dossier backend, il faut créer un fichier ".env" et indiquer :
 PORT = 3000.  
 DB_CONNEXION = `votre lien d'accès a Mongodb`.  
 TOKEN = `saisir une clé secrète`.  
 COOKIE_KEYS = `saisir une clé secrète`.  

*A l'inscription, l'utilisateur dois fournir un mail non utilisé, et un mot de passe de 6 caractères minimum qui dois contenir des chiffres et des lettres*  

----------------------------------------
*Ce projet a été validé le 19/07/2021*
