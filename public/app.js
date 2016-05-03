
var freepongApp = angular.module('freepongApp', ['ui.router','ngTable','ngResource','ngCookies','file-model'])

    freepongApp.config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('login', {
            url: '/login',
            templateUrl: '/Vistas/VistaLogin/vistaLogin.html',
            controller: 'loginCtrl'
          })
          .state('registro', {
            url: '/registro',
            templateUrl: '/Vistas/VistaRegistro/vistaRegistro.html',
            controller: 'registroCtrl'
          })
          ;
      $urlRouterProvider.otherwise('login');
    })
