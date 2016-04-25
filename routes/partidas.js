/**
 * Created by raul on 3/4/16.
 */

module.exports = function (app) {

    var mongoose = require('mongoose');
    var Partida  = require('../modelos/partida.js');
    var Usuario  = require('../modelos/usuario.js');
    var Mesa     = require('../modelos/mesa.js');
    //GET - Obtener todas las partidas de la colecccion partidas de la BBDD
    ObtenerPartidas = function (req, res) {
        Partida.find(function (err, partidas) {
            if (err) res.send(500, err.message);

            console.log('GET /partidas')
            res.status(200).jsonp(partidas);
        });
    };

    CrearPartida =  function(req, res, next){
        var partida = new Partida();
        partida.IDcreador = req.body.IDcreador;
        partida.IDmesa    = req.body.IDmesa;

        partida.save(function(err, partida){
            if(err){return next(err)}
            res.json(partida);
            console.log('POST /creador/' + req.body.creador);
        })
    };
    //GET - Obtner partida a partir de el ID

    ObtenerPartidaporID = function (req, res) {
        Partida.findById(req.params.id, function (err, partida) {
            if (err) return res.send(500, err.message);

            console.log('GET /partida/' + req.params.id);
            res.status(200).jsonp(partida);
        });
    };

    //PUT Añadir usuario invitado a una partida creada ID
    UnirsePartidaporID = function (req, res) {
        console.log('Put/UnirsePartida')
        Partida.findById(req.params.id, function (err, partida) {

            console.log(req.body);

            partida.IDinvitado  =  req.body.IDinvitado;

            partida.save(function (err) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(partida);
            });
        });
    };

    //DELETE - Eliminar partida v2
    EliminarPartidaporID = function(req, res){
        console.log('DELETE partida');
        console.log(req.params.id);
        Partida.findByIdAndRemove(req.params.id, function(err){
            if(err){res.send(err)}
            res.json({message: 'Partida eliminada correctamente'});
        })
    };

    //GET Obtener todos las partidas de la colecccion partidas paginado
    ObtenerPartidasP = function (req, res){
        console.log('post /obtenerpartidasP');
        var sort;
        var sortObject = {};
        var count      = req.query.count || 5;
        var page       = req.query.page || 1;

        var filter = {
            filters : {
                mandatory : {
                    contains: req.query.filter
                }
            }
        };
        var pagination = {
            start: (page - 1) * count,
            count: count
        };

        if (req.query.sorting) {
            var sortKey   = Object.keys(req.query.sorting)[0];
            var sortValue = req.query.sorting[sortKey];
            sortObject[sortValue] = sortKey;
        }
        else {
            sortObject.desc = '_id';
        }

        sort = {
            sort: sortObject
        };

        Partida
            .find()
            .filter(filter)
            .order(sort)
            .page(pagination, function(err, partidas) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    res.jsonp(partidas);
                }
            });

    };


    //ENDPOINTS
    app.post(   '/partida/CrearPartida', CrearPartida);
    app.put(    '/partida/UnirsePartida/:id', UnirsePartidaporID);
    app.get(    '/partida/ObtenerPartidas', ObtenerPartidas);
    app.get(    '/partida/ObtenerPartidasPaginadas', ObtenerPartidasP);
    app.get(    '/partida/ObtenerPartidaPorID/:id', ObtenerPartidaporID);
    app.delete( '/partida/EliminarPartidaPorID/:id', EliminarPartidaporID);

}
