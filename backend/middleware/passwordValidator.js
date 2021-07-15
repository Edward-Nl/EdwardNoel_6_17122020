//Middleware qui controle la saisi d'un Mdp sécurisé
const schema = require('../models/passwordVerif');

module.exports = (req, res, next) => {
    if(!schema.validate(req.body.password)) {
        res.writeHead(400, 'Mot de passe : 6 caratères minimum, 1 chiffre & une lettre requis', {
            'content-type': 'application/json'
        });
        res.end('Format de mot de passe incorrect');
    } else {
        next();
    }
};