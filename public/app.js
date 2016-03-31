
var freepongApp = angular.module('freepongApp', ['ui.router','ngTable'])

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
          });
      $urlRouterProvider.otherwise('login');
    })
