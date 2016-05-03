'use strict';
var box = {};
freepongApp.controller('registroCtrl', [ '$state', '$http', '$scope', 'FlashService', function ( $state, $http, $scope, FlashService ) {
    $scope.usuario = {};
    box = $scope.usuario;


    
    $scope.registro= function () {
        console.log(box);
        //variables para poder trabajar con archivos
        var formData = new FormData();
        var file = $scope.myFile;
        console.log ("El fichero es:", file);
        formData.append("file", file);

        $http.post('/usuario/CrearUsuario', box).success(function (data)

        {//funcion que actualiza el JSON con la imagen
            $http.put('/upload/' + box.nombre, formData, {
                    headers: {
                        "Content-type": undefined
                    },
                    transformRequest: angular.identity
                }
            )
        .success(function (data){
            FlashService.Success('Registro correcto', true);
            $state.go('login');
            swal({
                  title: "Usuario Creado",
                  text: "El usuario " + box.nombre + " " + box.apellidos + " se ha creado correctamente",
                  imageUrl: '/images/ok.png'
            });
        })

        }).error(function(error){
            FlashService.Error('Username ya existente, introduzca otro', true);
            swal({
                  title: "Error",
                  text: "Error al crear el usuario" + box.nombre + " " + box.apellidos + " ",
                  imageUrl: '/images/error.png'
            });
        })
    };

}]);
