'use strict';
var box = {};
freepongApp.controller('loginCtrl', ['$state', '$http', '$scope', 'FlashService', function ($state, $http, $scope, FlashService ) {
    $scope.userInfo = {};
    $scope.test=true;
    console.log("LOGINCTLR test=",$scope.test);

    box = $scope.userInfo;
    $scope.login = function () {
        console.log("box", box);
        $scope.test=true;
        console.log("22222 LOGINCTLR test=",$scope.test);
        $http.post('usuario/Login', box).success(function (data)
        {
            console.log(data);

            if (data.loginSuccessful == true) {
                if(data.usuario[0].login == 'admin' || data.usuario[0].password == 'admin'){
                    FlashService.Success('Login correcto', true);
                    $state.go('admin')
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
