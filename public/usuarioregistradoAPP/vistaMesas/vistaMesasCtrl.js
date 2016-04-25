
usuarioregistradoApp.controller('vistaMesasCtrl',['$scope','$http',function($scope,$http) {

    $http.get('/mesa/ObtenerMesas').success(function (data)
    {
        var mesas= data;
        console.log(mesas);
        $scope.mesas= mesas;
        $scope.gotolink= function(event,i)
        {
            alert('has seleccionado la mesa: '+ i.nombre);
        };

    });



    }]);