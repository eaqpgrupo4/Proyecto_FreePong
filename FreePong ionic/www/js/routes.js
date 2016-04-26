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
    .state('freepong.notificaciones', {
      url: '/notificaciones',
      views: {
        'menuContent': {
         templateUrl: 'templates/notificaciones.html'
        }
      }
    })
    .state('freepong.amigos', {
      url: '/amigos',
      views: {
        'menuContent': {
         templateUrl: 'templates/amigos.html'
        }
      }
    })
    .state('freepong.registro', {
      url: '/registro',
      views: {
        'menuContent': {
         templateUrl: 'templates/registro.html'
        }
      }
    })
    .state('freepong.login', {
      url: '/login',
      views: {
        'menuContent': {
         templateUrl: 'templates/login.html'
        }
      }
    })
    .state('freepong.logout', {
      url: '/logout',
      views: {
        'menuContent': {
         templateUrl: 'templates/logout.html'
        }
      }
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