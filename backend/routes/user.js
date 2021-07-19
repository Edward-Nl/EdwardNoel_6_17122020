const express = require('express');
const router = express.Router();
const bouncer = require('express-bouncer')(10000, 60000, 5);

const userControllers = require('../controllers/user');

const passwordValidator = require('../middleware/passwordValidator')

// Route pour crée un compte, et route de connexion
router.post('/signup', passwordValidator, userControllers.signup);
router.post('/login', bouncer.block, userControllers.login);

module.exports = router;