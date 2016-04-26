angular.module('freepong.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('freepong', {
      url: '/freepong',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('freepong.perfil', {
        url: '/perfil',
      views: {
      'menuContent': {
        templateUrl: 'templates/perfil.html',
        controller: 'PerfilController'
        }
      }
    })
    .state('freepong.search', {
      url: '/search',
      views: {
        'menuContent': {
         templateUrl: 'templates/search.html'
        }
      }
    })
    .state('freepong.usuarios', {
      url: '/usuarios',
        views: {
         'menuContent': {
          templateUrl: 'templates/usuarios.html',
          controller: 'UsuariosController'
        }
      }
    })
    .state('freepong.partidas', {
      url: '/partidas',
      views: {
      'menuContent': {
        templateUrl: 'templates/partidas.html',
        controller: 'PartidasController'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/freepong/usuarios');

    
});