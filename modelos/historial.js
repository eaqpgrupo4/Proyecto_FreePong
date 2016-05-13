var mongoose = require('mongoose');
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;


var historialEsquema = new Schema({
    logincreador: {type: String},
    logininvitado: {type: String},
    fecha: {type: String},
    resultadocreador:{type: Number, default: 0},
    resultadoinvitado:{type: Number, default: 0},
    nombremesa:{type: String}
});

module.exports = mongoose.model('Historial', historialEsquema);