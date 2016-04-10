/**
 * Created by raul on 5/4/16.
 */

'use strict';
freepongApp.factory("Mesas", function ($resource) {
    return $resource('mesa/ObtenerMesasPaginadas'); //la url donde queremos consumir
});
freepongApp.controller('mesasCtrl', ['$state','$http','$scope','$location','Mesas', 'ngTableParams',function($state, $http ,$scope, $location , Mesas, ngTableParams ) {

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
            Mesas.get(params.url(), function(response) {
                params.total(response.total);
                $defer.resolve(response.results);
            });
        }
    };
    $scope.tableParams = new ngTableParams(params, settings);

    $scope.create = function()
    {
        var Mesa = new Mesas ({
            horas:      this.creador,
            local:      this.invitado,
            visitante:  this.mesa,
            partidas:   this.mesa
        });

        mesa.$save(function(response) {
            $location.path('customers/' + response._id);

            $scope.horas     = '';
            $scope.local     = '';
            $scope.visitante = '';
            $scope.partidas  = '';

        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

    // Remove existing Customer
    $scope.delete = function(id){
        swal({
                title: "¿Estás Seguro/a?",
                text: "¡Vas a borrar esta mesa de la base de datos!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",confirmButtonText: "Sí, borrar!",
                cancelButtonText: "No, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false },
            function(isConfirm){
                if (isConfirm) {
                    $http.delete('mesa/EliminarMesaPorID/' + id)
                        .success(function (data) {
                            $scope.newMesa = {};
                            swal("Eliminada", "Mesa eliminada de FreePong", "success");
                            $scope.tableParams.reload();
                        })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
                } else {
                    swal("Cancelado", "Has decidido no borrar la mesa", "error");
                }
            });

    };

    // Update existing Customer
    $scope.update = function()
    {
        var mesa = $scope.mesa ;

        mesa.$update(function() {
            $location.path('mesas/' + mesa._id);
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

    // Find a list of Customers
    $scope.find = function()
    {
        var mesas = Mesas.get();
        console.log(mesas);
        $scope.mesas = mesas.results;

        //$scope.customers = Customers.query();
    };

    // Find existing Customer
    $scope.findOne = function()
    {
        $scope.customer = Mesas.get({
            customerId: $stateParams.customerId
        });
    };


}]);