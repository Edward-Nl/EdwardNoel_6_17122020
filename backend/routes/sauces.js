const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const sauceCtrl = require('../controllers/sauces');

// Route qui affiche qu'une seule, ou toutes les sauces
router.get('/', auth, sauceCtrl.affichageSauces);
router.get('/:id', auth, sauceCtrl.affichageSauceUnique);

// Route pour crée, mofif, et supprimer une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauces);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// Route pour les likes, et les dislikes
router.post('/:id/like', auth, sauceCtrl.likeDislike);

module.exports = router; 