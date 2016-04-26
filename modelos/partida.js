
var mongoose = require('mongoose');
Schema   = mongoose.Schema;
ObjectId = Schema.ObjectId;

var Usuario = new Schema({
    _id: {type: Schema.ObjectId, ref: 'Usuario'},
    login: {type: String}
})

var partidaEsquema = new Schema({

    IDmesa:  	 { type: Schema.ObjectId, ref: "Mesa" },
    FechaPartida:{ type: String},
    P1:
    {
        creador:Usuario,
        invitado:Usuario
    },
    P2:
    {
        creador:Usuario,
        invitado:Usuario
    }

});

module.exports = mongoose.model('Partida', partidaEsquema);

