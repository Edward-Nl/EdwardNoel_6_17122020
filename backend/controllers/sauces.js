// Récuperation du Model Sauces, utilisation de fs pour les images(télechargement et modif),
// et création des middleware pour la route Sauces
const Sauce = require('../models/sauces');
const fs =  require('fs');

// Creation d'une sauce 
exports.createSauce = (req, res, next) => {
    const objSauces = JSON.parse(req.body.sauce);
    delete objSauces._id;
    const sauce = new Sauce({
        ...objSauces,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce crée'}))
        .catch(error => res.status(400).json({error}));
    
};

// Affichage d'une seule sauce grâce a l'Id
exports.affichageSauceUnique = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then((sauce) => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}));
};

// Affichage de toute les sauces
exports.affichageSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}))
}

//Modification de sauce
exports.modifySauces = (req, res, next) => {
    const objSauces = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...objSauces, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

//Supprime la sauce choisi
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error}));
};

// Like ou Dislike
exports.likeDislike = (req, res, next) => {
    const userId = req.body.userId;
    Sauce.findOne({ _id: req.params.id })
        .then( sauce => {
            switch (req.body.like) {
                case 1 : // Like d'une sauce
                    if(!sauce.usersLiked.includes(userId)) {
                        Sauce.updateOne({ _id: req.params.id }, { $inc:{likes: +1}, $push:{usersLiked: userId}, _id: req.params.id })
                            .then(() => {res.status(200).json({ message: "Vous aimez cette Sauce"})})
                            .catch(error => res.status(400).json({ error }));
                        if(sauce.usersDisliked.includes(userId)) {
                            Sauce.updateOne({ _id: req.params.id }, { $inc:{dislikes: -1}, $pull:{usersDisliked: userId}, _id: req.params.id })
                                .then(() => {res.status(200).json({ message: "Vous ne disliker plus cette sauce !"})})
                                .catch(error => res.status(400).json({ error }));
                        }
                    }
                    break;

                case -1 :   // Dislike d'une sauce
                    if(!sauce.usersDisliked.includes(userId)) {
                        Sauce.updateOne({ _id: req.params.id }, { $inc:{dislikes: +1}, $push:{usersDisliked: userId}, _id: req.params.id })
                            .then(() => {res.status(200).json({ message: "Vous n\'aimez pas cette Sauce"})})
                            .catch(error => res.status(400).json({ error }));
                        if (sauce.usersLiked.includes(userId)) {
                            Sauce.updateOne({ _id: req.params.id }, { $inc:{likes: -1}, $pull:{usersLiked: userId}, _id: req.params.id })
                                .then(() => {res.status(200).json({ message: "Vous n\'aimez plus cette sauce !"})})
                                .catch(error => res.status(400).json({ error }));    
                        }
                    }
                    break;

                case 0 : // Annule le like ou le dislike
                    if (sauce.usersLiked.includes(userId)) {
                        Sauce.updateOne({ _id: req.params.id }, { $inc:{likes: -1}, $pull:{usersLiked: userId}, _id: req.params.id })
                            .then(() => {res.status(200).json({ message: "Vous n\'aimez plus cette sauce !"})})
                            .catch(error => res.status(400).json({ error }));
                        
                    } 
                    else if (sauce.usersDisliked.includes(userId)) {
                        Sauce.updateOne({ _id: req.params.id }, { $inc:{dislikes: -1}, $pull:{usersDisliked: userId}, _id: req.params.id })
                        .then(() => {res.status(200).json({ message: "Vous ne disliker plus cette sauce !"})})
                        .catch(error => res.status(400).json({ error }));
                    }     
                    break;
                default : 
                    console.log(error);
            }
        })
        .catch(error => res.status(400).json({ error })) 
};