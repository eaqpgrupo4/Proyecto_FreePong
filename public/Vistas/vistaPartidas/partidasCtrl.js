/**
 * Created by raul on 5/4/16.
 */

'use strict';
freepongApp.factory("Partidas", function ($resource, $stateParams) {
    return $resource('partida/ObtenerPartidasPaginadas'); //la url donde queremos consumir
});
freepongApp.controller('partidasCtrl', ['$state','$http','$scope','$location','Partidas', '$stateParams', 'ngTableParams',function($state, $http ,$scope, $location , Partidas, $stateParams, ngTableParams ) {

    var params;
    var settings;

    params =
    {
        page: 1,
        count: 10
    };
    settings =
    {
        total: 0,
        counts: [5, 10, 25, 50, 100],
        getData: function($defer, params) {
            Partidas.get(params.url(), function(response) {
                params.total(response.total);
                $defer.resolve(response.results);
            });
        }
    };
    $scope.tableParams = new ngTableParams(params, settings);

    $scope.create = function()
    {
        var partida = new Partidas ({
            creador:    this.creador,
            invitado:   this.invitado,
            mesa:       this.mesa
        });

        partida.$save(function(response) {
            $location.path('customers/' + response._id);

            $scope.creador     = '';
            $scope.invitado    = '';
            $scope.mesa        = '';

        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

    // Remove existing Customer
    $scope.delete = function(id){
        swal({
                title: "¿Estás Seguro/a?",
                text: "¡Vas a borrar esta partida de la base de datos!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",confirmButtonText: "Sí, borrar!",
                cancelButtonText: "No, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false },
            function(isConfirm){
                if (isConfirm) {
                    $http.delete('partida/EliminarPartidaPorID/' + id)
                        .success(function (data) {
                            $scope.newPartida = {};
                            swal("Eliminada", "Partida eliminada de FreePong", "success");
                            $scope.tableParams.reload();
                        })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
                } else {
                    swal("Cancelado", "Has decidido no borrar la partida", "error");
                }
            });

    };

    // Update existing Customer
    $scope.update = function()
    {
        var partida = $scope.partida ;

        partida.$update(function() {
            $location.path('partidas/' + partida._id);
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

    // // Find a list of Customers
    // $scope.find = function(){
    //     var partidas = {}
    //     return $http.get('/partida/ObtenerPartidas')
    //         .success(function(data){
    //             $scope.partidas = data;
    //         return partidas
    //     })
        

    //     console.log(partidas);


    //     //$scope.customers = Customers.query();
    // };
    $scope.find = function(){
        var partidas = {}
        return $http.get('/partida/ObtenerPartidas')
            .success(function(data){
                $scope.partidas = data;
                console.log(partidas);
        })
    };

    // Find a list of Customers
    // $scope.find = function()
    // {
    //     var partidas = Partidas.get();
    //     console.log(partidas);
    //     $scope.partidas = partidas.results;

    //     //$scope.customers = Customers.query();
    // };

    // Find existing Customer
    $scope.findOne = function()
    {
        $scope.customer = Partidas.get({
            customerId: $stateParams.customerId
        });
    };


}]);