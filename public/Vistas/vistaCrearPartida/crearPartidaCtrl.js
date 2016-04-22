/**
 * Created by raul on 5/4/16.
 */

'use strict';
var box = {};

usuarioregistradoApp.controller('crearPartidaCtrl', [ '$state', '$http', '$scope', '$stateParams',function ( $state, $http, $scope,$stateParams) {
    var id = $stateParams.id;
    console.log('crearpartida'+id);

    $scope.partida = {};
    box = $scope.partida;
    $scope.crearPartida= function () {
        console.log(box);
        $http.post('/partida/CrearPartida', box).success(function (data)
        {
            FlashService.Success('Partida creada correctamente', true);
            $state.go('partidas');
            swal({
                  title: "Partida Creada",
                  text: "La partida se ha creado correctamente",
                  imageUrl: 'images/ok.png'
            });
        }).error(function(error){
            FlashService.Error('Error al crear la partida', true);
            swal({
                  title: "Error",
                  text: "Error al crear la partida",
                  imageUrl: 'images/error.png'
            });
        })
    };
    $scope.uiConfig = {
        calendar:{
            height: 450,
            editable: true,
            header:{
                left: 'month basicWeek basicDay agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            dayClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
        }
    };

}]);
