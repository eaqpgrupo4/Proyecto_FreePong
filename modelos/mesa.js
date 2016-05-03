

var mongoose = require('mongoose');
Schema   = mongoose.Schema;
ObjectId = Schema.ObjectId;


var mesaEsquema = new Schema({
    localizacion:      { type: String },
    nombre:            { type: String },
    urlfoto:           { type: String }
    //foto: {type: file}
});

module.exports = mongoose.model('Mesa', mesaEsquema);