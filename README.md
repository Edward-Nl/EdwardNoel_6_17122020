EDWARD NOËL - SO PEKOCKO - PROJET 6 - FORMATION DEVELOPPEUR WEB OPENCLASSROOMS

Vous êtes développeur backend freelance et vous travaillez depuis quelques années sur des projets web pour des startups ou des grandes entreprises.

La semaine dernière, vous avez reçu un mail vous proposant un nouveau projet.

La marque So Pekocko, qui crée des sauces piquantes, connaît un franc succès, en partie grâce à sa chaîne de vidéos YouTube “La piquante”.

L’entreprise souhaite désormais développer une application d’évaluation de ses sauces piquantes, appelée “Piquante”.

Même si l’application deviendra peut-être un magasin en ligne dans un futur proche, Sophie, la product owner de So Pekocko, a décidé que le MVP du projet sera une application web permettant aux utilisateurs d’ajouter leurs sauces préférées et de liker ou disliker les sauces ajoutées par les autres utilisateurs.


        INSTRUCTION :

Il faut cloner ce projet GitHub

Pour faire tourner le frontend : 

-Lancer le terminal sur le dossier frontennd 
-Utiliser npm install pour installer les dépendances, npm install node-sass pour installer sass
-Attention le projet est généré avec la version 7.0.2 de Angular CLI
-Démarrer le frontend avec ng serve, le projet s'affiche sur http://localhost:4200

Pour faire tourner le backend :

-Lancer le terminal sur le dossier Backend 
-Utiliser npm install pour installer les dépendances, npm install nodemon pour installer nodemon
-Démarrer le backend avec nodemon server

Pour des raisons de sécurité :

- Merci de créer un fichier ".env" dans le dossier backend et d'indiquer :
    PORT = 3000
    DB_CONNEXION = "votre lien d'accès a Mongodb"
    TOKEN = "saisir une clé secrète"
    COOKIE_KEYS = "saisir une clé secrète"

 -A l'inscription, l'utilisateur dois fournir un mail non utilisé, et un mot de passe de 6 caractères minimum qui dois contenir des chiffres et des lettres