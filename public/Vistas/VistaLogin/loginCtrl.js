'use strict';
var box = {};
freepongApp.controller('loginCtrl', ['$state', '$http', '$scope', 'FlashService', function ($state, $http, $scope, FlashService ) {
    $scope.userInfo = {};
    box = $scope.userInfo;
    $scope.login = function () {
        console.log(box);
        $http.post('usuario/Login', box).success(function (data)
        {
            console.log(data);

            if (data.loginSuccessful == true) {
                if(data.usuario[0].login == 'admin' || data.usuario[0].password == 'admin'){
                    FlashService.Success('Login correcto', true);
                    $state.go('admin');
                }
                else{

                    FlashService.Success('Login correcto', true);

                    $state.go('usuario',
                        {
                            login: data.usuario[0].login,
                            id: data.usuario[0]._id
                        });
                }
            }
            else {console.log("LOGIN error");}
        }).error(function(error)
        {
            FlashService.Error('Login incorrecto', true);
            $state.go('login');
        })
    };
}]);
