
usuarioregistradoApp.controller('crearPartidaCtrl', ['$stateParams','$state','$http','$scope','$cookies','dateFilter',function($stateParams,$state, $http ,$scope,$cookies,dateFilter)
{
    var IDuser = $stateParams.IDuser;
    var IDmesa = $stateParams.IDmesa;
    var login = $stateParams.login;
    var Fecha={};

    console.log();
    var partida= new Object();
    $scope.date = dateFilter(new Date(), 'yyyy-MM-dd');
    $scope.$watch("date",function(newValue,oldValue) {

        if (newValue===oldValue) {
            return;
        }
        $http.get('/partida/ObtenerPartidaPorFechaymesa/'+IDmesa+'/'+newValue).success(function (data)
        {
            partida=data[0];
            $scope.partida=partida;
        });

    });
    $scope.minDate = '2015-10-06';
    Fecha= $scope.date;
    $cookies.put('fecha', Fecha);
    console.log($scope.date);
    //Obtener el objeto partida para el dia yyyy-MM-dd y el IDmesa seleccionnados y rellenar la tabla PARTIDA
    $scope.cargarpartidas= function(d){console.log(d)};
    $http.get('/partida/ObtenerPartidaPorFechaymesa/'+IDmesa+'/'+dateFilter(new Date(), 'yyyy-MM-dd')).success(function (data)
    {
        partida=data[0];
        $scope.partida=partida;
    });
    $scope.crearpartida= function(p){
        var box=({IDmesa: IDmesa, FechaPartida:Fecha,IDcreador:IDuser,login:login,horario:p});
        if(partida==null)
        {
            $http.post('/partida/CrearPartida', box).success(function (data) {
                partida=data[0];
                $scope.partida=partida;
            });
        }
        else
        {
            var box1=({IDcreador:IDuser,login:login,horario:p});
            $http.put('/partida/AsignarHoraPartidaporID/'+ partida._id, box1).success(function (data)
            {
                partida=data[0];
                $scope.partida=partida;
        });

        }
    }
    $scope.unirseapartida= function(p){
        console.log(p);
        var box2=({IDinvitado:IDuser,login:login,horario:p});
        $http.put('/partida/UnirsePartida/'+ partida._id, box2).success(function (data)
        {
            partida=data[0];
            $scope.partida=partida;
        });
    }
}]);

