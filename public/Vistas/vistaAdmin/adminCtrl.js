
'use strict';

freepongApp.factory("Usuarios", function ($resource) {

    return $resource('usuario/ObtenerUsuariosPaginados'); //la url donde queremos consumir

});

freepongApp.controller('adminCtrl', ['$state','$http','$scope','$location','Usuarios', 'ngTableParams',function($state, $http ,$scope, $location , Usuarios, ngTableParams ) {

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }

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
            Usuarios.get(params.url(), function(response) {
                params.total(response.total);
                $defer.resolve(response.results);
            });
        }
    };

    $scope.tableParams = new ngTableParams(params, settings);

    // $scope.create = function()
    // {
    //     var usuario = new Usuarios ({
    //         nombre:     this.nombre,
    //         apellidos:  this.apellidos,
    //         email:      this.email,
    //         telefono:   this.telefono,
    //         login:      this.login,
    //         password:   this.password,
    //         saldo:      this.saldo
    //     });
    //
    //     usuario.$save(function(response) {
    //         $location.path('customers/' + response._id);
    //
    //         $scope.nombre       = '';
    //         $scope.apellidos    = '';
    //         $scope.email        = '';
    //         $scope.telefono     = '';
    //         $scope.login        = '';
    //         $scope.password     = '';
    //         $scope.saldo        = '';
    //
    //     }, function(errorResponse) {
    //         $scope.error = errorResponse.data.message;
    //     });
    // };

    // Remove existing Customer
    $scope.delete = function(id){
        swal({
           title: "¿Estás Seguro/a?",
           text: "¡Vas a borrar a este usuario de la base de datos!",
           type: "warning",
           showCancelButton: true,
           confirmButtonColor: "#DD6B55",confirmButtonText: "Sí, borrar!",
           cancelButtonText: "No, cancelar!",
           closeOnConfirm: false,
           closeOnCancel: false },
        function(isConfirm){
            if (isConfirm) {
                $http.delete('usuario/EliminarUsuarioPorID/' + id)
                    .success(function (data) {
                    $scope.newUsuario = {};
                    swal("Eliminado", "Usuario eliminado de FreePong", "success");
                    $state.go("admin", {}, { reload: true });
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
            } else {
                swal("Cancelado", "Has decidido no borrar al usuario", "error");
            }
        });

    };

    // Update existing Customer
    $scope.update = function()
    {
        var usuario = $scope.usuario ;

        usuario.$update(function() {
            $location.path('/usuario/ModificarUsuarioPorID/' + usuario._id);
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
