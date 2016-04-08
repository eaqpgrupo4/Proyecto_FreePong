/**
 * Created by raul on 5/4/16.
 */

var mongoose = require('mongoose');
Schema   = mongoose.Schema;

var mesaEsquema = new Schema({
    horas:      { type: String },
    local:      { type: String },
    visitante:  { type: String },
    partidas:   { type: String }
});

module.exports = mongoose.model('Mesa', mesaEsquema);