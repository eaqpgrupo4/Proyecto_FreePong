var usuarioregistradoApp = angular.module('usuarioregistradoApp', ['ui.calendar','ui.router','ngTable','ngResource','ngCookies'])

usuarioregistradoApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('inicio', {
            url: '/',
            templateUrl: 'usuarioregistrado.html',
            controller: 'usuarioregistradoCtrl'
        })
        .state('crearPartida', {
            url: '/crearPartida/:id',
            templateUrl: 'vistaCrearPartida/vistaCrearPartida.html',
            controller: 'crearPartidaCtrl'
        })
    .state('editar', {
        url: '/editar/:id',
        templateUrl: 'vistaEditar/vistaEditar.html',
        controller: 'editarCtrl'
    });
    $urlRouterProvider.otherwise('/');
});

