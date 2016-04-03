/**
 * Created by raul on 3/4/16.
 */

module.exports = function (app) {

    var mongoose = require('mongoose');
    var Partida = require('../modelos/partida.js');

    //GET - Obtener todas las partidas de la colecccion partidas de la BBDD
    ObtenerPartidas = function (req, res) {
        Partida.find(function (err, partidas) {
            if (err) res.send(500, err.message);

            console.log('GET /partidas')
            res.status(200).jsonp(partidas);
        });
    };


    //POST - Agregar partida login v2
    //CrearPartida = function(req, res){
    //    resultado = res;
    //    var mesa = req.body.mesa;
    //    //Comprueba si exite la mesa en la BD
    //    Partida.find({mesa:mesa},function(err,partida){
    //        //Si no exite
    //        if(partida == "") {
    //            console.log('mesa no existente, OK');
    //            var partida = new Partida(req.body);
    //            partida.save(function(err, partida){
    //                if (err) return resultado.send(500, err.message);
    //                console.log('POST /partida/' + req.body.mesa);
    //                resultado.status(200).jsonp(partida);
    //            });
    //        } else {
    //            console.log('mesa ya existente');
    //            return resultado.status(409).jsonp("La mesa: " + mesa + " ya existe, elije otra diferente.");
    //        }
    //    });
    //};


    CrearPartida =  function(req, res, next){
        var partida = new Partida(req.body);

        partida.save(function(err, partida){
            if(err){return next(err)}
            res.json(partida);
        })
    };

    //POST - Añadir usuario en coleccion usuarios
    // CrearUsuario = function (req, res) {
    //     resultado = res;
    //     var login = req.body.login;
    //     //Comprueba si exite el login en la BD
    //     Usuario.find({login:login},function(err,usuario){
    //         //Si no exite
    //         if(usuario == ""){
    //             console.log('usuario no existente, OK');
    //             var usuario = new Usuario({
    //                 nombre:     req.body.nombre,
    //                 apellidos:  req.body.apellidos,
    //                 email:      req.body.email,
    //                 telefono:   req.body.telefono,
    //                 login:      req.body.login,
    //                 password:   req.body.password,
    //                 saldo:      req.body.saldo
    //             })
    //             usuario.save(function (err, usuario) {
    //                 if (err) return resultado.send(500, err.message);
    //                 resultado.status(200).jsonp(usuario);
    //                 console.log('POST /user/' + req.body.nombre);
    //             });
    //         }
    //         //Si existe
    //         else{
    //             console.log('usuario ya existente');
    //             return resultado.status(409).jsonp("El username: " + login + " ya existe, elije otro diferente.");
    //         }
    //     });
    // };

    //GET - Obtner partida a partir de el ID
    ObtenerPartidaporID = function (req, res) {
        Partida.findById(req.params.id, function (err, partida) {
            if (err) return res.send(500, err.message);

            console.log('GET /partida/' + req.params.id);
            res.status(200).jsonp(partida);
        });
    };

    //PUT Modificar datos de una partida existente por ID
    ModificarPartida = function (req, res) {
        Partida.findById(req.params.id, function (err, partida) {
            console.log('PUT');
            console.log(req.body);
                partida.creador   =  req.body.creador,
                partida.invitado  =  req.body.invitado,
                partida.mesa      =  req.body.mesa


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


    //DELETE Eliminar usuario por ID
    // EliminarUsuarioporID = function (req, res) {
    //     console.log('DELETE usuario');
    //     console.log(req.params.id);
    //
    //     Usuario.findById(req.params.id, function (err, usuario) {
    //         usuario.remove(function (err) {
    //             if (!err)
    //                 console.log('Removed');
    //             else {
    //                 console.log('ERROR' + err);
    //             }
    //         })
    //     });
    //
    //     res.send('Usuario borrado');
    // };

    //POST loginIN Hacer login usuario
    //loginIN = function (req, res) {
    //    console.log('post /login');
    //    console.log(req.body);
    //    resultado = res;
    //    var login = req.body.login;
    //    var p1;
    //    var p2;
    //    var key = [];
    //    Usuario.find({login:login},function(err,user){
    //        if(user.length == 0){
    //            return resultado.status(404).jsonp({"loginSuccessful": false, "login": login});
    //        }
    //        else {
    //            var usuario = JSON.stringify(user);
    //            var res = usuario.split(",");
    //            key = res[6].split(":");
    //            p1 = key[1];
    //            p2 = '"' + req.body.password + '"';
    //            if(p1==p2){
    //                return resultado.status(200).jsonp({"loginSuccessful": true, "usuario": user});
    //            }
    //            else{
    //                return resultado.status(404).jsonp({"loginSuccessful": false, "login": login});
    //            }
    //        }
    //    });
    //};

    //GET Obtener todos las partidas de la colecccion partidas paginado
    ObtenerPartidasP = function (req, res){
        console.log('post /obtenerpartidasP');
        var count  = req.query.count || 5;
        var page   = req.query.page || 1;

        var filter = {
            filters:
            {
                mandatory:
                {
                    contains: req.query.filter
                }
            }
        };
        var pagination =
        {
            start: (page - 1) * count,
            count: count
        };

        var sort =
        {
            sort:
            {
                desc: '_id'
            }
        };

        Partida
            .find({gender: req.params.gender})
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
    app.get(    '/partida/ObtenerPartidas', ObtenerPartidas);
    app.get(    '/partida/ObtenerPartidasPaginadas', ObtenerPartidasP);
    app.get(    '/partida/ObtenerPartidaPorID/:id', ObtenerPartidaporID);
    app.put(    '/partida/ModificarPartidaPorID/:id', ModificarPartida);
    app.delete( '/partida/EliminarPartidaPorID/:id', EliminarPartidaporID);
    //app.post(   '/usuario/Login', loginIN);
}
