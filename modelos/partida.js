/**
 * Created by raul on 3/4/16.
 */

var mongoose = require('mongoose');
Schema   = mongoose.Schema;

var partidaEsquema = new Schema({
    creador:    { type: String },
    invitado:   { type: String },
    mesa:  	    { type: String }
});

module.exports = mongoose.model('Partida', partidaEsquema);