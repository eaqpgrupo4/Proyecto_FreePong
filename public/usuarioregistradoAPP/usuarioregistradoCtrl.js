usuarioregistradoApp.controller('usuarioregistradoCtrl', ['$state', '$http', '$scope', '$cookies', function ($state, $http, $scope, $cookies) {
    var login = $cookies.get('login');
    var IDuser = $cookies.get('id');
    $scope.login = login;
    $scope.crearPartida = function () {
        $state.go('crearPartida', {
            id: id
        });
    };
    $scope.editar = function () {
        $state.go('editar', {
            id: id
        });
    };
    $scope.vermesas = function () {
        $state.go('mesas', {
            IDuser: IDuser,
            login: login
        });
    };

}]);