
var freepongApp = angular.module('freepongApp', ['ui.router','ngTable','ngResource'])

    freepongApp.config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('login', {
            url: '/login',
            templateUrl: 'vistas/vistaLogin/vistaLogin.html',
            controller: 'loginCtrl'
          })
          .state('registro', {
            url: '/registro',
            templateUrl: 'vistas/vistaRegistro/vistaRegistro.html',
            controller: 'registroCtrl'
          })
          .state('admin', {
            url: '/admin',
            templateUrl: 'vistas/vistaAdmin/vistaAdmin.html',
            controller: 'adminCtrl'
          })
          .state('editar', {
            url: '/editar',
            templateUrl: 'vistas/vistaEditar/vistaEditar.html',
            controller: 'editarCtrl'
          })
          .state('add', {
            url: '/add',
            templateUrl: 'vistas/vistaAdd/vistaAdd.html',
            controller: 'addCtrl'
          })
          .state('partidas', {
              url: '/partidas',
              templateUrl: 'vistas/vistaPartidas/vistaPartidas.html',
              controller: 'partidasCtrl'
          })
          .state('crearPartida', {
              url: '/partidasCreadas',
              templateUrl: 'vistas/vistaCrearPartida/vistaCrearPartida.html',
              controller: 'crearPartidaCtrl'
          });
      $urlRouterProvider.otherwise('login');
    })
