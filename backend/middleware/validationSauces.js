// Middleware qui permet le controle de la saisi dans le formulaire des sauces
const validate = require('mongoose-validator');

exports.validName = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Le nom de la sauce doit contenir entre 3 et 50 caractères',
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-z\d\-_\s]+$/i,
        message: 'Le nom de votre sauce ne peut contenir que des chiffres & des lettres'
    }),
];

exports.validManufact = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Le nom du manufacturier doit contenir entre 3 et 50 caractères',
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-z\d\-_\s]+$/i,
        message: 'Le nom du manufacturier ne peut contenir que des chiffres & des lettres'
    }),
];

exports.validDescription = [
    validate({
        validator: 'isLength',
        arguments: [3, 400],
        message: 'La description de la sauce doit contenir entre 3 et 400 caractères',
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-z\d\-_.,!\s]+$/i,
        message: 'La description de votre sauce ne peut contenir que des chiffres & des lettres'
    }),
];

exports.validPepper = [
    validate({
        validator: 'isLength',
        arguments: [3, 15],
        message: 'Le principal ingrédient de la sauce doit contenir entre 3 et 15 caractères',
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-z\d\-_\s]+$/i,
        message: 'Le principal ingrédient votre sauce ne peut contenir que des chiffres & des lettres'
    }),
];