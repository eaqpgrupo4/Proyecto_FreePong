/**
 * Created by carlos on 31/03/2016.
 */
var mongoose = require('mongoose');
Schema   = mongoose.Schema;

var usuarioEsquema = new Schema({
    nombre:    	{ type: String },
    apellidos:  { type: String },
    email:  	{ type: String },
    telefono:   { type: String },
    login:   	{ type: String },
    password:   { type: String },
    saldo:	{ type: Number }
});

module.exports = mongoose.model('Usuario', usuarioEsquema);