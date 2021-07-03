const Sauce = require('../models/sauces');
const fs =  require('fs');

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

exports.affichageSauceUnique = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then((sauce) => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}));
};

exports.affichageSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}))
}

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

exports.likeDislike = (req, res, next) => {
    const like = req.body.like;
    if(like === 1) { // Option like
        Sauce.updateOne({_id: req.params.id}, { $inc: { likes: 1}, $push: { usersLiked: req.body.userId}, _id: req.params.id })
        .then( () => res.status(200).json({ message: 'Vous aimez cette sauce !' }))
        .catch( error => res.status(400).json({ error}))
    } else if(like === -1) { // Option dislike
        Sauce.updateOne({_id: req.params.id}, { $inc: { dislikes: 1}, $push: { usersDisliked: req.body.userId}, _id: req.params.id })
        .then( () => res.status(200).json({ message: 'Vous n\'aimez pas cette sauce !' }))
        .catch( error => res.status(400).json({ error}))

    } else {    // Annuler like ou dislike
        Sauce.findOne( {_id: req.params.id})
        .then( sauce => {
            if( sauce.usersLiked.indexOf(req.body.userId)!== -1){
                 Sauce.updateOne({_id: req.params.id}, { $inc: { likes: -1},$pull: { usersLiked: req.body.userId}, _id: req.params.id })
                .then( () => res.status(200).json({ message: 'Vous n\'aimez plus cette sauce !' }))
                .catch( error => res.status(400).json({ error}))
                }
            else if( sauce.usersDisliked.indexOf(req.body.userId)!== -1) {
                Sauce.updateOne( {_id: req.params.id}, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId}, _id: req.params.id})
                .then( () => res.status(200).json({ message: 'Vous aimez cette sauce !' }))
                .catch( error => res.status(400).json({ error}))
                }           
        })
        .catch( error => res.status(400).json({ error}))             
    }   
}