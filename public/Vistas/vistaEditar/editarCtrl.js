freepongApp.controller('editarCtrl', ['$stateParams','$state','$http','$scope','$location','ngTableParams','FlashService',function($stateParams,$state, $http ,$scope, $location , ngTableParams,FlashService )
{
        $scope.selected = false;
        var id = $stateParams.id;
        console.log(id);
         $http.get('/usuario/ObtenerUsuarioPorID/'+ id).success(function (data){

        $scope.nombre=data.nombre;
        $scope.apellidos=data.apellidos;
        $scope.email=data.email;
        $scope.telefono=data.telefono;
        $scope.login=data.login;
        $scope.password=data.password;


    });
    $scope.update= function(nombre,apellidos,email,telefono,login,password,saldo)
    {
        var usuario = {};
        usuario.nombre= nombre;
        usuario.apellidos= apellidos;
        usuario.email= email;
        usuario.telefono= telefono;
        usuario.login= login;
        usuario.password= password;
        usuario.saldo= saldo;

        console.log(usuario);
        $http.put('/usuario/ModificarUsuarioPorID/'+ id,usuario)
            .success(function (data)
            {
                FlashService.Success('Usuario modificado', true);
            })
            .error(function(error)
            {
                FlashService.Error('HA OCURRIDO ALGUN ERROR', true);

            })
    }
}]);


