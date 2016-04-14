
'use strict';
freepongApp.controller('usuarioCtrl', ['$stateParams','$state','$http','$scope','ngTableParams',function($stateParams,$state, $http ,$scope,ngTableParams ) {

    //Obtenemos los datos state "login"
    var id = $stateParams.id;
    var login = $stateParams.login;

    //Cargamos la variable login en la vista Usuario
    $scope.login = login;

    $scope.partidas = function()
    {
        console.log(id);
        $state.go('partidas',
            {
                id:id
            });
    };
    $scope.editar = function()
    {
        console.log(id);
        $state.go('editar',
            {
                id:id
            });
    };
}]);

