const mongoose = require('mongoose');
require('mongoose-type-email');

const uniqueValidator = require('mongoose-unique-validator');
const mongooseSanitizerPlugin = require('mongoose-sanitizer-plugin');


const userSchema = mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.Email, required: true, unique: true,
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Veuillez entrer une adresse email correcte"]
  },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(mongooseSanitizerPlugin);

module.exports = mongoose.model('User', userSchema);