
var _base = "http://localhost:3000";
angular.module('freepong', ['ionic', 'freepong.controllers', 'freepong.routes'])

.run(function($ionicPlatform, $rootScope, $ionicLoading, $location, $timeout) {
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

  $rootScope.authktd = false;
    $rootScope.showLoading = function (msg) {
      $ionicLoading.show({
        template: msg || 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    }

    $rootScope.hideLoading = function () {
      $ionicLoading.hide();
    };

    $rootScope.toast = function (msg) {
      $rootScope.showLoading(msg);
      $timeout(function () {
        $rootScope.hideLoading();
      }, 3000);
    };

    $rootScope.toast2 = function (msg) {
      $rootScope.showLoading(msg);
      $timeout(function () {
        $rootScope.hideLoading();
      }, 1000);
    };

  })

.factory('API', ['$http', function ($http) {

    var _api = {

    	//GET GROUP
    	getUsuarios: function () {
	        return $http.get(_base + '/usuario/ObtenerUsuarios/');
	    },
	    getUsuario: function (id) {
	    	console.log(id);
	        return $http.get(_base + '/usuario/ObtenerUsuarioPorID/' + id);
	    },
	    getPartidas: function () {
	        return $http.get(_base + '/partida/ObtenerPartidas');
	    },

	    //DELETE GROUP
	    deleteUsuario: function (id) {
	        return $http.delete(_base + '/usuario/EliminarUsuarioPorID/' + id);
	    },
	    deleteUsuario: function (id) {
	        return $http.delete(_base + '/usuario/EliminarUsuarioPorID/' + id);
	    },

      //LOG IN & SIGN UP
      login: function (usuario) {
        return $http.post(_base + '/usuario/Login/', usuario);
      },
      signup: function (usuario) {
        return $http.post(_base + '/usuario/CrearUsuario', usuario);
      },

    };
    return _api;
}])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})
/*
.controller('LoginController', ['$rootScope', '$state', '$scope', 'API', '$http', '$ionicModal', '$ionicHistory', function ($rootScope, $state, $scope, api, $http, $ionicModal, $ionicHistory) {

  $scope.log = {
      login: '',
      password: ''
  }

  $scope.loginUser = function () {
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory()
      if (($scope.log.login == '') && ($scope.log.password == '')) {
        $rootScope.toast('Campo username y password vacíos');
      }
      else if ($scope.log.login == '') {
        $rootScope.toast('Campo username vacío');
      }
      else if ($scope.log.password == '') {
        $rootScope.toast('Campo password vacío');
      }
      else {
        var usuario = {};
        $rootScope.showLoading("Autenticando..");

        api.login($scope.log).success(function (data) {
            window.localStorage['iduser'] = data.usuario[0]._id;
            window.localStorage['username'] = data.usuario[0].login;
            window.localStorage['saldo'] = data.usuario[0].saldo;
            window.localStorage['nombre'] = data.usuario[0].nombre;
            window.localStorage['apellidos'] = data.usuario[0].apellidos;
            window.localStorage['email'] = data.usuario[0].email;
            window.localStorage['telefono'] = data.usuario[0].telefono;
            
            usuario.id = data.usuario[0]._id;
            usuario.nombre = data.usuario[0].nombre;
            usuario.apellidos = data.usuario[0].apellidos;
            usuario.login = data.usuario[0].login;
            usuario.email = data.usuario[0].email;
            usuario.telefono = data.usuario[0].telefono;
            usuario.saldo = data.usuario[0].saldo;
          // socket.emit('newUser', usuario, function (data) {

          // });


          $state.go('freepong.usuarios');
          $rootScope.hideLoading();
        }).error(function (data) {
          $rootScope.hideLoading();
          $rootScope.toast('Usuario o password incorrecto');
        })
      }
    }

    $scope.register = function () {
      $state.go('freepong.registro');
    }

}])*/

.controller('LoginController',function($scope,$http,$state){
  console.log("DENTRO DE login");
  $scope.usuario={};
  $scope.login = function () {
    //console.log($scope.user);
    console.log($scope.usuario);
    $http.post(_base+'/usuario/Login', $scope.usuario).then(function (response) {
      console.log(response);
      //$cookies.putObject('user', response);
      $state.go('freepong.usuarios');
    },
    function(error){
      alert("ERROR");
    })
  }


})

.controller('registroController', ['$rootScope', '$state', '$scope', 'API', '$http', function ($rootScope, $state, $scope, api, $http) {

    var nombre;
    var apellidos;
    var login;
    var telefono;
    var saldo;
    var password;
    var email;
    var saldo;

    // $scope.usuario = {
    //       nombre: '',
    //       apellidos: '',
    //       email: '',
    //       telefono: '',
    //       login: '',
    //       password: '',
    //       saldo: ''
    // }

    $scope.usuario = {}

    $scope.registerUser = function () {
      $rootScope.hideLoading();
      api.signup($scope.usuario).success(function (data) {
        $rootScope.toast('Registrándote en FreePong...');
        console.log(data);
        console.log(data);
        $state.go('freepong.usuarios');
        $scope.usuario = {}
      }).error(function (data) {
        $rootScope.hideLoading();
        $rootScope.toast('El usuario ya existe');
        $scope.usuario = {}
      })
    }
}])

.controller('UsuariosController', ['$rootScope', '$scope', '$http', '$state', 'API', '$stateParams', function($rootScope, $scope, $http, $state, api, $stateParams) {
	
	api.getUsuarios().success(function (data) {
			$rootScope.toast2('Cargando usuarios...');
			$scope.usuarios = data;
		}).error(function(data){
	})

	$scope.deleteUser = function(id){
		$rootScope.toast2('Borrando usuario...');
		$http.delete(_base+'/usuario/EliminarUsuarioPorID/' + id)
		$state.go("freepong.usuarios", {}, { reload: true });
	};

	$scope.vistaPerfil = function(id){
		console.log(id);
		$state.go('freepong.perfil', {
        	id: id
    })
	};
}])

.controller('PartidasController', ['$rootScope', '$scope', '$http', '$state', 'API', function($rootScope, $scope, $http, $state, api) {
	api.getPartidas().success(function (data) {
			$rootScope.toast2('Cargando partidas...');
			$scope.partidas = data;
		}).error(function(data){
	})	
}])

.controller('PerfilController', ['$rootScope', '$scope', '$http', '$state', 'API', '$stateParams', function($rootScope, $scope, $http, $state, api, $stateParams) {
	var idlogin = window.localStorage['idlogin'];
  var id = $stateParams.id;
	api.getUsuario(id).success(function (data) {
			$rootScope.toast2('Cargando perfil...');
			$scope.usuario = data;
      // $rootScope.toast2('Cargando perfil...');
      // $scope.nombre = data.nombre;
      // $scope.apellidos = data.apellidos;
      // $scope.email = data.email;
      // $scope.telefono = data.telefono;
      // $scope.login = data.login;
      // $scope.password = data.password;
      // $scope.saldo = data.saldo;
		}).error(function(data){
	})
}]);


