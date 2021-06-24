const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const routesUser = require('./routes/user');
//const routerSauces = require('./routes/sauces');

mongoose.connect('mongodb+srv://edward:openCProjet6@cluster0.um0yy.mongodb.net/sopeckokodb?retryWrites=true&w=majority',
    {   useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(cors)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/auth', routesUser);
//app.use('/api/sauces', routerSauces);

module.exports = app;