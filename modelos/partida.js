/**
 * Created by raul on 5/4/16.
 */

var mongoose = require('mongoose');
Schema   = mongoose.Schema;

var partidaEsquema = new Schema({
    creador:    { type: String },
    invitado:   { type: String },
    mesa:  	    { type: String },
    created: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Partida', partidaEsquema);