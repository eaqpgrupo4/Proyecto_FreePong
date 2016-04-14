
var mongoose = require('mongoose');
Schema   = mongoose.Schema;
ObjectId = Schema.ObjectId;

var partidaEsquema = new Schema({
    IDcreador:   { type: Schema.ObjectId, ref: "Usuario" },
    IDinvitado:  { type: Schema.ObjectId, ref: "Usuario" },
    IDmesa:  	 { type: Schema.ObjectId, ref: "Mesa" },
    created:     { type: Date,default: Date.now},
});

module.exports = mongoose.model('Partida', partidaEsquema);