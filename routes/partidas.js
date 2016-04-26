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

    CrearPartida =  function(req, res, next)
    {
        var partida = new Partida(req.body);
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

        console.log('Put/UnirsePartida/'+ req.body.IDinvitado)

        Partida.findById(req.params.id, function (err, partida)
        {
            console.log(partida);
            switch(req.body.horario)
            {
                case"P1":
                {
                    partida.P1.invitado._id= req.body.IDinvitado;
                    partida.P1.invitado.login= req.body.login;
                    break;
                }

                case"P2":
                {
                    partida.P2.invitado._id= req.body.IDinvitado;
                    partida.P2.invitado.login= req.body.login;
                    break;
                }
                default:
                    console.log("Error , ninguna hora seleccionada");
            }

            partida.save(function (err) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(partida);
            });
        });
    };
    AsignarHoraPartidaporID = function (req, res) {
        var user= new Object();
        user._id= req.body.IDcreador;
        user.login= req.body.login;
        console.log('Put/AsignarHoraPartidaporID')
        Partida.findById(req.params.id, function (err, partida) {
            switch(req.body.horario)
            {
                case"P1": {partida.P1.creador._id= req.body.IDcreador;
                    partida.P1.creador.login= req.body.login;
                    break;}
                case"P2": {partida.P2.creador._id= req.body.IDcreador;
                    partida.P2.creador.login= req.body.login;
                    break;}
                default:
                    console.log("Error , ninguna hora seleccionada");
            }

            partida.save(function (err) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(partida);
            });
        });
    }

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
    app.put(    '/partida/AsignarHoraPartidaporID/:id', AsignarHoraPartidaporID);
    app.get(    '/partida/ObtenerPartidas', ObtenerPartidas);
    app.get(    '/administradorAPP/partida/ObtenerPartidasPaginadas', ObtenerPartidasP);
    app.get(    '/partida/ObtenerPartidaPorID/:id', ObtenerPartidaporID);
    app.delete( '/partida/EliminarPartidaPorID/:id', EliminarPartidaporID);

}
