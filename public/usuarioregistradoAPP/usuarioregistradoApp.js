var usuarioregistradoApp = angular.module('usuarioregistradoApp', ['ngMap','ui.router','ngTable','ngResource','ngCookies','pickadate'])

usuarioregistradoApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('inicio', {
            url: '/',
            templateUrl: 'usuarioregistrado.html',
            controller: 'usuarioregistradoCtrl'
        })
        .state('mesas', {
            url: '/mesas',
            templateUrl: 'vistaMesas/vistaMesas.html',
            controller: 'vistaMesasCtrl'
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

