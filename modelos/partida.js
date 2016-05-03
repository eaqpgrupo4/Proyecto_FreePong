
var mongoose = require('mongoose');
Schema   = mongoose.Schema;
ObjectId = Schema.ObjectId;
var Usuario = new Schema(
    {
        _id: {type: Schema.ObjectId, ref: 'Usuario'},
        login: {type: String}
    });
var partidaEsquema = new Schema(
    {
        IDmesa:  	 { type: Schema.ObjectId, ref: 'Mesa' },
        FechaPartida:{ type: String},
        P1:{creador:Usuario,invitado:Usuario}, //08:00-09:00
        P2:{creador:Usuario,invitado:Usuario}, //09:00-10:00
        P3:{creador:Usuario,invitado:Usuario}, //10:00-11:00
        P4:{creador:Usuario,invitado:Usuario}, //11:00-12:00
        P5:{creador:Usuario,invitado:Usuario}, //12:00-13:00
        P6:{creador:Usuario,invitado:Usuario}, //13:00-14:00
        P7:{creador:Usuario,invitado:Usuario}, //14:00-15:00
        P8:{creador:Usuario,invitado:Usuario}, //15:00-16:00
        P9:{creador:Usuario,invitado:Usuario}, //16:00-17:00
        P10:{creador:Usuario,invitado:Usuario},//17:00-18:00
        P11:{creador:Usuario,invitado:Usuario},//18:00-19:00
        P12:{creador:Usuario,invitado:Usuario} //19:00-20:00
    });
module.exports = mongoose.model('Partida', partidaEsquema);

