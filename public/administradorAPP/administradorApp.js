/**
 * Created by carlos on 19/04/2016.
 */
var administradorApp = angular.module('administradorApp', ['ui.router','ngTable','ngResource','ngCookies', 'file-model'])

administradorApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('inicio', {
            url: '/',
            templateUrl: 'administrador.html',

        })
        .state('adminusuarios', {
            url: '/adminusuarios',
            templateUrl: 'vistaAdminUsuarios/vistaAdminUsuarios.html',
            controller: 'adminusuariosCtrl'
        })

        .state('partidas', {
            url: '/partidas/:id',
            templateUrl: 'vistaPartidas/vistaPartidas.html',
            controller: 'partidasCtrl'
        })


        .state('mesas', {
            url: '/mesas',
            templateUrl: 'vistaMesas/vistaMesas.html',
            controller: 'mesasCtrl'
        })
        .state('editar', {
            url: '/editar/:id',
            templateUrl: '../usuarioregistradoAPP/vistaEditar/vistaEditar.html',
            controller: 'editarCtrl'
        })
        .state('crearMesa', {
            url: '/crearMesa',
            templateUrl: 'vistaCrearMesa/vistaCrearMesa.html',
            controller: 'crearMesaCtrl'

        });
    $urlRouterProvider.otherwise('/');
})