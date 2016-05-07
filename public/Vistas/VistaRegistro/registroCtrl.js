'use strict';
var box = {};
freepongApp.controller('registroCtrl', ['$state', '$http', '$scope', 'FlashService', function ($state, $http, $scope, FlashService) {
    $scope.usuario = {};
    box = $scope.usuario;


    $scope.registro = function ()
    {
        var conflict=false;
        console.log(box);
        //variables para poder trabajar con archivos
        var formData = new FormData();
        var file = $scope.myFile;
        console.log("El fichero es:", file);
        formData.append("file", file);
        $http.post('/usuario/CrearUsuario', box)
            .success(function (data)
            {

                FlashService.Success('Registro correcto', true);
                $state.go('login');
                swal({
                    title: "Usuario Creado",
                    text: "El usuario " + box.nombre + " " + box.apellidos + " se ha creado correctamente",
                    imageUrl: '/images/ok.png'
                });
            })
            .error(function (data)
            {
                conflict = true;
                FlashService.Error('Login ya existente, introduzca otro', true);
                swal({
                    title: "Error",
                    text: "Error al crear el usuario" + box.nombre + " " + box.apellidos + " ",
                    imageUrl: '/images/error.png'
                });
                // console.log('Error: ' + data.status);
            });
        if (conflict==false)
        {
            console.log('fffff'+box.login);
            $http.put('/usuario/upload/' + box.login, formData, {
                    headers: {
                        "Content-type": undefined
                    },
                    transformRequest: angular.identity
                }
                )
                .success(function (data) {

                    $state.go('login');
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }



    };

}]);
