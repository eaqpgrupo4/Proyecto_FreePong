/**
 * Created by raul on 5/4/16.
 */

'use strict';
var box = {};

administradorApp.controller('crearMesaCtrl', [ '$state', '$http', '$scope',  function ( $state, $http, $scope ) {
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

            $state.go('mesas');
            swal({
                  title: "Mesa Creada",
                  text: "La mesa se ha creado correctamente",
                  imageUrl: '/images/ok.png'
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