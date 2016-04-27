
usuarioregistradoApp.controller('crearPartidaCtrl', ['$state','$http','$scope','$cookies','dateFilter',function($state, $http ,$scope,$cookies,dateFilter)
{
    var id = $stateParams.id;
    console.log(id);
    var partida= new Object();
    $scope.date = dateFilter(new Date(), 'yyyy-MM-dd');
    $scope.minDate = '2015-10-06';
    $http.get('/partida/ObtenerPartidaPorFechaymesa/571f8929e1c57f3804f59e0c/2016-04-30').success(function (data){
        partida=data[0];

        console.log(partida.P1.creador.login);
        $scope.partida=partida;
    });

}]);

