
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
            url: '/editar/:id',
            templateUrl: 'vistas/vistaEditar/vistaEditar.html',
            controller: 'editarCtrl'
          })
          .state('add', {
            url: '/add',
            templateUrl: 'vistas/vistaAdd/vistaAdd.html',
            controller: 'addCtrl'
          })
          .state('partidas', {
              url: '/partidas/:id',
              templateUrl: 'vistas/vistaPartidas/vistaPartidas.html',
              controller: 'partidasCtrl'
          })
          .state('crearPartida', {
              url: '/crearPartida/:id',
              templateUrl: 'vistas/vistaCrearPartida/vistaCrearPartida.html',
              controller: 'crearPartidaCtrl'
          })
          .state('usuario', {
              url: '/usuario/:login/:id',
              templateUrl: 'vistas/vistaUsuario/vistaUsuario.html',
              controller: 'usuarioCtrl'

          })
          .state('mesas', {
              url: '/mesas',
              templateUrl: 'vistas/vistaMesas/vistaMesas.html',
              controller: 'mesasCtrl'
          })
          .state('crearMesa', {
              url: '/crearMesa',
              templateUrl: 'vistas/vistaCrearMesa/vistaCrearMesa.html',
              controller: 'crearMesaCtrl'

          });
      $urlRouterProvider.otherwise('login');
    })
