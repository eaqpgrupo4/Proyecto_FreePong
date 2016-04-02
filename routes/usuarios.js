
module.exports = function (app) {

    var mongoose = require('mongoose');
    var Usuario = require('../modelos/usuario.js');

    //GET - Obtener todos los usuarios de la colecccion usuarios de la BBDD
    ObtenerUsuarios = function (req, res) {
        Usuario.find(function (err, usuarios) {
            if (err) res.send(500, err.message);

            console.log('GET /usuarios')
            res.status(200).jsonp(usuarios);
        });
    };

    //POST - Añadir usuario en coleccion usuarios
    CrearUsuario = function (req, res) {
        resultado = res;
        var login = req.body.login;
        //Comprueba si exite el login en la BD
        Usuario.find({login:login},function(err,usuario){
            //Si no exite
            if(usuario == ""){
                console.log('usuario no encontrado');
                var usuario = new Usuario({
                    nombre:     req.body.nombre,
                    apellidos:  req.body.apellidos,
                    email:      req.body.email,
                    telefono:   req.body.telefono,
                    login:      req.body.login,
                    password:   req.body.password,
                    saldo:      req.body.saldo
                })
                usuario.save(function (err, usuario) {
                    if (err) return resultado.send(500, err.message);
                    resultado.status(200).jsonp(usuario);
                });
            }
            //Si existe
            else{
                console.log('usuario  encontrado');
                return resultado.status(409).jsonp("usuario " + login + " ya existe");
            }
        });
    };

    //GET - Obtner usuario a partir de el ID
    ObtenerusuarioporID = function (req, res) {
        Usuario.findById(req.params.id, function (err, usuario) {
            if (err) return res.send(500, err.message);

            console.log('GET /user/' + req.params.id);
            res.status(200).jsonp(usuario);
        });
    };

    //PUT Modificar datos de un usuario existente por ID
    ModificarUsuario = function (req, res) {
        Usuario.findById(req.params.id, function (err, usuario) {
            console.log('PUT');
            console.log(req.body);
            usuario.nombre         =  req.body.nombre,
                usuario.apellidos  =  req.body.apellidos,
                usuario.email      =  req.body.email,
                usuario.telefono   =  req.body.telefono,
                usuario.login      =  req.body.login,
                usuario.password   =  req.body.password,
                usuario.saldo      =  req.body.saldo

            usuario.save(function (err) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(usuario);
            });
        });
    };

    //DELETE Eliminar usuario por ID
    EliminarUsuarioporID = function (req, res) {
        console.log('DELETE usuario');
        console.log(req.params.id);

        Usuario.findById(req.params.id, function (err, usuario) {
            usuario.remove(function (err) {
                if (!err)
                    console.log('Removed');
                else {
                    console.log('ERROR' + err);
                }
            })
        });

        res.send('Usuario borrado');
    };

    //POST loginIN Hacer login usuario
    loginIN = function (req, res) {
        console.log('post /login');
        console.log(req.body);
        resultado = res;
        var login = req.body.login;
        var p1;
        var p2;
        var key = [];
        Usuario.find({login:login},function(err,user){
            if(user.length == 0){
                return resultado.status(404).jsonp({"loginSuccessful": false, "login": login});
            }
            else {
                var usuario = JSON.stringify(user);
                var res = usuario.split(",");
                key = res[6].split(":");
                p1 = key[1];
                p2 = '"' + req.body.password + '"';
                if(p1==p2){
                    return resultado.status(200).jsonp({"loginSuccessful": true, "usuario": user});
                }
                else{
                    return resultado.status(404).jsonp({"loginSuccessful": false, "login": login});
                }
            }
        });
    };

    //GET Obtener todos los usuarios de la colecccion usuarios paginado
    ObtenerUsuariosP = function (req, res){
        console.log('post /obtenerusuariosP');
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

        Usuario
            .find({gender: req.params.gender})
            .filter(filter)
            .order(sort)
            .page(pagination, function(err, usuarios) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    res.jsonp(usuarios);
                }
        });

    };


    //ENDPOINTS
    app.post(   '/usuario/CrearUsuario', CrearUsuario);
    app.get(    '/usuario/ObtenerUsuarios', ObtenerUsuarios);
    app.get(    '/usuario/ObtenerUsuariosPaginados', ObtenerUsuariosP);
    app.get(    '/usuario/ObtenerUsuarioPorID/:id', ObtenerusuarioporID);
    app.put(    '/usuario/ModificarUsuarioPorID/:id', ModificarUsuario);
    app.delete( '/usuario/EliminarUsuarioPorID/:id', EliminarUsuarioporID);
    app.post(   '/usuario/Login', loginIN);
}
