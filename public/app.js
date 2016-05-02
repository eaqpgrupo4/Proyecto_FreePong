
var freepongApp = angular.module('freepongApp', ['ui.router','ngTable','ngResource','ngCookies','file-model'])

    freepongApp.config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('login', {
            url: '/login',
            templateUrl: '/vistas/vistaLogin/vistaLogin.html',
            controller: 'loginCtrl'
          })
          .state('registro', {
            url: '/registro',
            templateUrl: '/vistas/vistaRegistro/vistaRegistro.html',
            controller: 'registroCtrl'
          })
          ;
      $urlRouterProvider.otherwise('login');
    })
