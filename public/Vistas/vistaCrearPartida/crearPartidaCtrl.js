/**
 * Created by raul on 3/4/16.
 */

'use strict';
var box = {};

freepongApp.controller('crearPartidaCtrl', [ '$state', '$http', '$scope', 'FlashService', function ( $state, $http, $scope, FlashService ) {

    $scope.demo = function(){
        swal({
            title: "Raul Lorenzo",
            text: "Administrador de FreePong ®",
            imageUrl: "images/perfil_user.png" });

    };

    $scope.partida = {};
    box = $scope.partida;
    $scope.crearPartida= function () {
        console.log(box);
        $http.post('/partida/CrearPartida', box).success(function (data)
        {
            FlashService.Success('Partida creada correctamente', true);
            $state.go('partidas');

        }).error(function(error){
            FlashService.Error('Error al crear la partida', true);
        })
    };

}]);
