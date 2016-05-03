
module.exports = function (app) {
    var _base= "http://localhost:3000";
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

    //POST - Agregar usuario login v2
    CrearUsuario = function(req, res){
      resultado = res;
      var login = req.body.login;
      //Comprueba si exite el login en la BD
      Usuario.find({login:login},function(err,usuario){
        //Si no exite
        if(usuario == "") {
          console.log('usuario no existente, OK');
          var usuario = new Usuario(req.body);
          usuario.save(function(err, usuario){
            if (err) return resultado.send(500, err.message);
            console.log('POST /user/' + req.body.nombre);
            resultado.status(200).jsonp(usuario);
          });
        } else {
          console.log('usuario ya existente');
          return resultado.status(409).jsonp("El username: " + login + " ya existe, elije otro diferente.");
        }
      });
    };

    //GET - Obtner usuario a partir de el ID
    ObtenerUsuarioporID = function (req, res) {
        Usuario.findById(req.params.id, function (err, usuario) {
            if (err) return res.send(500, err.message);

            console.log('GET /user/' + req.params.id);
            res.status(200).jsonp(usuario);
        });
    };

    //PUT Modificar datos de un usuario existente por ID
    ModificarUsuario = function (req, res) {
        console.log('PUT/  = '+req.body.login );
        Usuario.findById(req.params.id, function (err, usuario) {

                usuario.nombre     =  req.body.nombre,
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

    //DELETE - Eliminar usuario v2
    EliminarUsuarioporID = function(req, res){
      console.log('DELETE usuario');
      console.log(req.params.id);
      Usuario.findByIdAndRemove(req.params.id, function(err){
        if(err){res.send(err)}
        res.json({message: 'Usuario eliminado correctamente'});
      })
    };

    //POST loginIN Hacer login usuario
    loginIN = function (req, res) {
        console.log('post /login');
        console.log(req.body);
        resultado = res;
        var login = req.body.login;
        Usuario.find({login:login},function(err,user){
            if(user.length == 0){
                return resultado.status(404).jsonp({"loginSuccessful": false, "login": login});
            }
            else {
                console.log(user);
                //console.log("login",user.login);
                if (user[0].password==req.body.password) {
                    console.log("OK",req.body.password);
                    return resultado.status(200).jsonp({"loginSuccessful": true, "usuario": user});
                }
                else {
                    console.log("KO", req.body.password);
                    console.log("KO", user[0].password)
                    return resultado.status(404).jsonp({"loginSuccessful": false, "login": login});
                }
            }
        });
    };

    //GET Obtener todos los usuarios de la colecccion usuarios paginado
    ObtenerUsuariosP = function (req, res){
        console.log('post /obtenerusuariosP');

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

        Usuario
            .find()
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

    //variables para operar con ficheros
    var fs = require('fs');
    var imagen;
    //PUT- Funcion para subir la foto al servidor
    uploadimage = function (req, res) {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            console.log (files);
            var tmp_path = files.file.path;
            var tipo = files.file.type;//tipo del archivo

            if (tipo == 'image/png' || tipo == 'image/jpg' || tipo == 'image/jpeg') {
                //Si es de tipo png jpg o jpeg
                var aleatorio = Math.floor((Math.random() * 9999) + 1);//Variable aleatoria
                filename = aleatorio + "" + files.file.name;//nombre del archivo mas variable aleatoria

                var target_path = './public/images/' + filename;// hacia donde subiremos nuestro archivo dentro de nuestro servidor
                fs.rename(tmp_path, target_path, function (err) {//Escribimos el archivo
                    fs.unlink(tmp_path, function (err) {//borramos el archivo tmp
                        //damos una respuesta al cliente
                        console.log('<p>Imagen subida OK</p></br><img  src="./images/' + filename + '"/>');
                    });

                });
                console.log (req.params.usuario);
                Usuario.findOne({nombre: req.params.usuario}, function (err, usuario) {
                    imagen = _base+"/images/" + filename;
                    usuario.urlfoto = imagen;

                    usuario.save(function (err) {
                        if (err) return res.send(500, err.message);
                        res.status(200).jsonp(usuario);
                    });
                });

            } else {
                console.log('Tipo de archivo imagen no soportada');
            }

            if (err) {
                console.error(err.message);
                return;
            }


        });

    };

    //ENDPOINTS
    app.post(   '/usuario/CrearUsuario', CrearUsuario);
    app.get(    '/usuario/ObtenerUsuarios', ObtenerUsuarios);
    app.get(    '/usuario/ObtenerUsuariosPaginados', ObtenerUsuariosP);
    app.get(    '/usuario/ObtenerUsuarioPorID/:id', ObtenerUsuarioporID);
    app.put(    '/usuario/ModificarUsuarioPorID/:id', ModificarUsuario);
    app.delete( '/usuario/EliminarUsuarioPorID/:id', EliminarUsuarioporID);
    app.post(   '/usuario/Login', loginIN);
    app.put('/upload/:usuario', uploadimage);
}