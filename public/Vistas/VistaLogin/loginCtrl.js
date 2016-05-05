'use strict';
var box = {};
freepongApp.controller('loginCtrl', ['$state', '$http', '$scope', 'FlashService', '$window', '$cookies', function ($state, $http, $scope, FlashService, $window, $cookies) {
    $scope.userInfo = {};


    box = $scope.userInfo;
    $scope.login = function () {
        console.log("box", box);

        $http.post('/usuario/Login', box).success(function (data) {
            console.log(data);

            if (data.loginSuccessful == true) {
                if (data.usuario[0].login == 'admin' || data.usuario[0].password == 'admin') {
                    FlashService.Success('Login correcto', true);
                    $window.location.href = '/administradorAPP/administrador.html'
                }
                else {
                    $cookies.put('login', data.usuario[0].login);
                    $cookies.put('id', data.usuario[0]._id);
                    FlashService.Success('Login correcto', true);

                    $window.location.href = '/usuarioregistradoAPP/usuarioregistrado.html'
                }
            }
            else {
                console.log("LOGIN error");
            }
        }).error(function (error) {
            FlashService.Error('Login incorrecto', true);
            $state.go('login');
        })
    };
}]);
