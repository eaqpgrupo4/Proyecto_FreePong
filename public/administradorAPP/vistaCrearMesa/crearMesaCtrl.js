/**
 * Created by raul on 5/4/16.
 */

'use strict';
var box = {};

administradorApp.controller('crearMesaCtrl', [ '$state', '$http', '$scope',  function ( $state, $http, $scope) {
    $scope.demo = function(){
        swal({
            title: "Raul Lorenzo",
            text: "Administrador de FreePong ®",
            imageUrl: "images/perfil_user.png" });

    };
    $scope.mesa = {};
    box = $scope.mesa;

    $scope.crearMesa= function () {
        console.log(box);

     /*   $scope.onFileSelect = function($files) {
            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var $file = $files[i];
                Upload.upload({
                    url: 'my/upload/url',
                    data: {file: $file}
                }).then(function (data, status, headers, config) {
                    // file is uploaded successfully
                    console.log(data);
                });
            }
        };*/
        var formData = new FormData();
        var file = $scope.myFile;
        console.log ("El fichero es:", file);
        formData.append("file", file);

        $http.post('/mesa/CrearMesa', box).success(function (data)
        {
            $http.put('/upload/' + box.nombre, formData, {
                    headers: {
                        "Content-type": undefined
                    },
                    transformRequest: angular.identity
                }
                )
                .success(function (data) {
                    $state.go('mesas');
                    swal({
                        title: "Mesa Creada",
                        text: "La mesa se ha creado correctamente",
                        imageUrl: '/images/ok.png'
                    });
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

        }).error(function(error){

            swal({
                  title: "Error",
                  text: "Error al crear la mesa",
                  imageUrl: '/images/error.png'
            });
        })


    };



}]);