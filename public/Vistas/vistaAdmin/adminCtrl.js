'use strict';
freepongApp.factory("Usuarios", function ($resource) {
    return $resource('usuario/ObtenerUsuariosPaginados'); //la url donde queremos consumir
});
freepongApp.controller('adminCtrl', ['$state','$http','$scope','$location','Usuarios', 'ngTableParams',function($state, $http ,$scope, $location , Usuarios, ngTableParams ) {
    var params =
    {
        page: 1,
        count: 4
    };
    var settings =
    {
        total: 0,
        counts: [5, 10, 15],
        getData: function($defer, params) {
            Usuarios.get(params.url(), function(response) {
                params.total(response.total);
                $defer.resolve(response.results);
            });
        }
    };
    $scope.tableParams = new ngTableParams(params, settings);

    $scope.create = function()
    {
        var usuario = new Usuarios ({
            nombre: this.nombre,
            apellidos: this.apellidos,
            email: this.email,
            telefono: this.telefono,
            login: this.login,
            password: this.password,
            saldo: this.saldo
        });

        usuario.$save(function(response) {
            $location.path('customers/' + response._id);

            // Clear form fields
            $scope.nombre = '';
            $scope.apellidos = '';
            $scope.email = '';
            $scope.telefono = '';
            $scope.login = '';
            $scope.password = '';
            $scope.saldo = '';

        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

    // Remove existing Customer
    $scope.remove = function( id )
    {
        $http.delete('usuario/EliminarUsuarioPorID/' + id)
        .success(function (data) {

            $state.go("admin", {}, { reload: true });
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    };

    // Update existing Customer
    $scope.update = function()
    {
        var usuario = $scope.usuario ;

        usuario.$update(function() {
            $location.path('usuarios/' + usuario._id);
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

    // Find a list of Customers
    $scope.find = function()
    {
        var usuarios = Usuarios.get();
        console.log(usuarios);
        $scope.usuarios = usuarios.results;

        //$scope.customers = Customers.query();
    };

    // Find existing Customer
    $scope.findOne = function()
    {
        $scope.customer = Usuarios.get({
            customerId: $stateParams.customerId
        });
    };


}]);