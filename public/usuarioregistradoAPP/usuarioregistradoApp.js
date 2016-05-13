var usuarioregistradoApp = angular.module('usuarioregistradoApp', ['ngMap', 'ui.router', 'ngTable', 'ngResource', 'ngCookies', 'pickadate'])

usuarioregistradoApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('inicio', {
            url: '/',
            templateUrl: 'usuarioregistrado.html',
            controller: 'usuarioregistradoCtrl'
        })
        .state('mesas', {
            url: '/mesas/:IDuser/:login',
            templateUrl: 'vistaMesas/vistaMesas.html',
            controller: 'vistaMesasCtrl'
        })
        .state('crearPartida', {
            url: '/crearPartida/:IDmesa/:IDuser/:login',
            templateUrl: 'vistaCrearPartida/vistaCrearPartida.html',
            controller: 'crearPartidaCtrl'
        })
        .state('insertarresultados', {
            url: '/insertarresultados/:login',
            templateUrl: 'vistainsertarresultados/vistainsertarresultados.html',
            controller: 'vistainsertarresultadosctrl'
        })
        .state('historial', {
            url: '/vistahistorial/:login',
            templateUrl: 'vistahistorial/vistahistorial.html',
            controller: 'vistahistorialctrl'
        })
        .state('editar', {
            url: '/editar/:id',
            templateUrl: 'vistaEditar/vistaEditar.html',
            controller: 'editarCtrl'
        });
    $urlRouterProvider.otherwise('/');
});

