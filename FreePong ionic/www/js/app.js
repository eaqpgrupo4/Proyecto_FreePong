

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'meetabroad' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'meetabroad.controllers' is found in controllers.js
angular.module('freepong', ['ionic', 'freepong.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.factory('ApiData', function() {
  return {
      url : 'http://localhost:3000'
  };
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html',
		controller: 'AppCtrl'
	})
	.state('app.perfil', {
      url: '/perfil',
		views: {
		'menuContent': {
			templateUrl: 'templates/perfil.html',
			controller: 'PerfilController'
			}
		}
	})
	.state('app.search', {
		url: '/search',
		views: {
			'menuContent': {
			 templateUrl: 'templates/search.html'
			}
		}
	})
    .state('app.usuarios', {
		url: '/usuarios',
      views: {
        'menuContent': {
          templateUrl: 'templates/usuarios.html',
          controller: 'UsuariosController'
        }
      }
    })
	.state('app.partidas', {
		url: '/partidas',
		views: {
		'menuContent': {
			templateUrl: 'templates/partidas.html',
			controller: 'PartidasController'
			}
		}
	});
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/usuarios');
});
