const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const dotenv = require('dotenv').config();
const cookieSession = require('cookie-session');
const nocache = require('nocache')


const routesUser = require('./routes/user');
const routerSauces = require('./routes/sauces');

const app = express();

mongoose.connect(process.env.DB_CONNEXION,
    {   useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(helmet());

app.use(cookieSession({
    name: 'session',
    keys: process.env.COOKIE_KEYS,
    cookie: {
        secure: true,
        httpOnly: true
    }
}));

app.use(nocache());

app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', routesUser);
app.use('/api/sauces', routerSauces);

module.exports = app;