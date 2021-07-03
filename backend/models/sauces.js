const mongoose = require('mongoose');
const mongooseSanitizerPlugin = require('mongoose-sanitizer-plugin');
const validate = require('../middleware/validationSauces');

const saucesSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true, validate: validate.validName},
    manufacturer: {type: String, required: true, validate: validate.validManufact},
    description: {type: String, required: true, validate: validate.validDescription},
    mainPepper: {type: String, required: true, validate: validate.validPepper},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, required: false, default:0},
    dislikes: {type: Number, required: false, default:0},
    usersLiked: {type: [String], required: false},
    usersDisliked: {type: [String], required: false},
});

saucesSchema.plugin(mongooseSanitizerPlugin);

module.exports = mongoose.model('sauces', saucesSchema);