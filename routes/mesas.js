
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
                mesa.localizacion    =  req.body.localizacion,
                mesa.nombre   =  req.body.nombre,

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

    //GET Obtener todas las mesas de la colecccion mesas paginado
    ObtenerMesasP = function (req, res){
        console.log('post /obtenermesasP');
        var sort;
        var sortObject = {};
        var count  = req.query.count || 5;
        var page   = req.query.page || 1;

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
            var sortKey = Object.keys(req.query.sorting)[0];
            var sortValue = req.query.sorting[sortKey];
            sortObject[sortValue] = sortKey;
        }
        else {
            sortObject.desc = '_id';
        }

        sort = {
            sort: sortObject
        };

        Mesa
            .find()
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
