/**
 * Created by raul on 5/4/16.
 */

module.exports = function (app) {

    var mongoose = require('mongoose');
    var Mesa = require('../modelos/mesa.js');

    //GET - Obtener todas las mesas de la colecccion mesas de la BBDD
    ObtenerMesas = function (req, res) {
        Mesa.find(function (err, mesas) {
            if (err) res.send(500, err.message);

            console.log('GET /mesas');
            res.status(200).jsonp(mesas);
        });
    };

    //POST - Agregar mesa
    CrearMesa =  function(req, res, next){
        var mesa = new Mesa(req.body);

        mesa.save(function(err, mesa){
            if(err){return next(err)}
            res.json(mesa);
            console.log('POST /partida/' + req.body.partida);
        })
    };

    //POST - Agregar mesa login v2
    //CrearMesa = function(req, res){
    //    resultado = res;
    //    var login = req.body.login;
    //    //Comprueba si exite el login en la BD
    //    Usuario.find({login:login},function(err,usuario){
    //        //Si no exite
    //        if(usuario == "") {
    //            console.log('usuario no existente, OK');
    //            var usuario = new Usuario(req.body);
    //            usuario.save(function(err, usuario){
    //                if (err) return resultado.send(500, err.message);
    //                console.log('POST /user/' + req.body.nombre);
    //                resultado.status(200).jsonp(usuario);
    //            });
    //        } else {
    //            console.log('usuario ya existente');
    //            return resultado.status(409).jsonp("El username: " + login + " ya existe, elije otro diferente.");
    //        }
    //    });
    //};

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

    //GET - Obtner mesa a partir de el ID
    ObtenerMesaporID = function (req, res) {
        Mesa.findById(req.params.id, function (err, mesa) {
            if (err) return res.send(500, err.message);

            console.log('GET /mesa/' + req.params.id);
            res.status(200).jsonp(mesa);
        });
    };

    //PUT Modificar datos de un mesa existente por ID
    ModificarMesa = function (req, res) {
        Mesa.findById(req.params.id, function (err, mesa) {
            console.log('PUT');
            console.log(req.body);
                mesa.horas     =  req.body.horas,
                mesa.local     =  req.body.local,
                mesa.visitante =  req.body.visitante,
                mesa.partidas  =  req.body.partidas

            mesa.save(function (err) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(mesa);
            });
        });
    };

    //DELETE - Eliminar mesa v2
    EliminarMesaporID = function(req, res){
        console.log('DELETE mesa');
        console.log(req.params.id);
        Mesa.findByIdAndRemove(req.params.id, function(err){
            if(err){res.send(err)}
            res.json({message: 'Mesa eliminada correctamente'});
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



    //GET Obtener todas las mesas de la colecccion mesas paginado
    ObtenerMesasP = function (req, res){
        console.log('post /obtenermesasP');
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

        Mesa
            .find({gender: req.params.gender})
            .filter(filter)
            .order(sort)
            .page(pagination, function(err, mesas) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    res.jsonp(mesas);
                }
            });

    };


    //ENDPOINTS
    app.post(   '/mesa/CrearMesa', CrearMesa);
    app.get(    '/mesa/ObtenerMesas', ObtenerMesas);
    app.get(    '/mesa/ObtenerMesasPaginadas', ObtenerMesasP);
    app.get(    '/mesa/ObtenerMesaporID/:id', ObtenerMesaporID);
    app.put(    '/mesa/ModificarMesa/:id', ModificarMesa);
    app.delete( '/mesa/EliminarMesaporID/:id', EliminarMesaporID);
}
