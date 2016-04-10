
'use strict';

freepongApp.factory("Usuarios", function ($resource)
{

    return $resource('usuario/ObtenerUsuariosPaginados'); //la url donde queremos consumir

});

freepongApp.controller('adminCtrl', ['$state','$http','$scope','$location','Usuarios', 'ngTableParams',function($state, $http ,$scope, $location , Usuarios, ngTableParams ) {
        // $scope.sort = function(keyname){
        //     $scope.sortKey = keyname;
        //     $scope.reverse = !$scope.reverse;
        // }

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
    $scope.demotableParams = new ngTableParams(params, settings);
    console.log( $scope.tableParams );


    // Remove existing Customer

    $scope.delete = function(usuario){
        swal(
                {
                   title: "¿Estás Seguro/a?",
                   text: "¡Vas a borrar a " + usuario.nombre + " " + usuario.apellidos + " de la base de datos!",
                   type: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#DD6B55",confirmButtonText: "Sí, borrar!",
                   cancelButtonText: "No, cancelar!",
                   closeOnConfirm: false,
                   closeOnCancel: false
                },
        function(isConfirm)
        {
            if (isConfirm)
            {
                if (usuario)
                {
                    $http.delete('usuario/EliminarUsuarioPorID/' + usuario._id)
                        .success(function (data)
                        {

                            swal("Eliminado", usuario.nombre + " " + usuario.apellidos + " ha sido eliminado de FreePong", "success");
                            // $state.go('admin',{},{reload: true });
                            $scope.tableParams.reload();
                        })
                        .error(function (data)
                        {
                            console.log('Error: ' + data);
                        });
                }
            }
            else
            {
                swal("Cancelado", "Has decidido no borrar al usuario " + usuario.nombre + " " + usuario.apellidos + " ", "error");
            }
        });

    };

    // Update existing Customer
    $scope.editar = function(usuario)
    {
        console.log(usuario._id);
        $state.go('editar',
            {
                id:usuario._id
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
