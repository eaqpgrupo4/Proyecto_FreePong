var usuarioregistradoApp = angular.module('usuarioregistradoApp', ['ui.calendar','ui.router','ngTable','ngResource','ngCookies'])

usuarioregistradoApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('inicio', {
            url: '/',
            templateUrl: 'usuarioregistrado.html',

        })
        .state('crearPartida', {
            url: '/crearPartida/:id',
            templateUrl: 'Vistas/vistaCrearPartida/vistaCrearPartida.html',
            controller: 'crearPartidaCtrl'
        });




    $urlRouterProvider.otherwise('/');
});
usuarioregistradoApp.controller('loginmenu', ['$state','$http','$scope','$cookies',function($state, $http ,$scope,$cookies){
    var login = $cookies.get('login');
    var id = $cookies.get('id');
    $scope.login =login;
    $scope.crearPartida = function()
    {
        console.log(id);
        $state.go('crearPartida',
            {
                id:id
            });
    };
}]);
