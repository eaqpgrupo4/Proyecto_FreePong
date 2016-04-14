

var mongoose = require('mongoose');
Schema   = mongoose.Schema;


var mesaEsquema = new Schema({
    localizacion:      { type: String },
    nombre:             { type: String }
});

module.exports = mongoose.model('Mesa', mesaEsquema);