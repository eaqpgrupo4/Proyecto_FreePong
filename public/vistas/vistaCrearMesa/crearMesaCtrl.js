/**
 * Created by raul on 5/4/16.
 */

'use strict';
var box = {};

freepongApp.controller('crearMesaCtrl', [ '$state', '$http', '$scope', 'FlashService', function ( $state, $http, $scope, FlashService ) {

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
        $http.post('/mesa/CrearMesa', box).success(function (data)
        {
            FlashService.Success('Mesa creada correctamente', true);
            $state.go('mesas');
            swal({
                  title: "Mesa Creada",
                  text: "La mesa se ha creado correctamente",
                  imageUrl: 'images/ok.png'
            });

        }).error(function(error){
            FlashService.Error('Error al crear la mesa', true);
            swal({
                  title: "Error",
                  text: "Error al crear la mesa",
                  imageUrl: 'images/error.png'
            });
        })
    };

}]);