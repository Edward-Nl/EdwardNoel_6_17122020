const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const sauceCtrl = require('../controllers/sauces');

router.get('/', auth, sauceCtrl.affichageSauces);
router.get('/:id', auth, sauceCtrl.affichageSauceUnique);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, sauceCtrl.modifySauces);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeDislike);

module.exports = router; 