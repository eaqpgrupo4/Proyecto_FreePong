
'use strict';
var box = {};
freepongApp.controller('addCtrl', [ '$state', '$http', '$scope', 'FlashService', function ( $state, $http, $scope, FlashService ) {
    $scope.usuario = {};
    box = $scope.usuario;
    $scope.registro= function () {
        console.log(box);
        $http.post('/usuario/CrearUsuario', box).success(function (data)
        {
            FlashService.Success('Registro correcto', true);
            $state.go('admin');

        }).error(function(error){
            FlashService.Error('Username ya existente, introduzca otro', true);
        })
    };

}]);
