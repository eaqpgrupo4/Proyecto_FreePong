/**
 * Created by raul on 5/4/16.
 */

var mongoose = require('mongoose');
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var usuarioEsquema = new Schema({
    nombre: {type: String},
    apellidos: {type: String},
    email: {type: String},
    telefono: {type: String},
    login: {type: String},
    password: {type: String},
    urlfoto: {type: String},
    saldo: {type: Number, default: 0},
    created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Usuario', usuarioEsquema);