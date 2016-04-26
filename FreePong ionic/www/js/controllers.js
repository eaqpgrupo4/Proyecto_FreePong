angular.module('freepong.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

.controller('UsuariosController', function($scope, $http, ApiData, $state) {
	$scope.usuarios = [];
	$scope.usuario = {};
  
	$http.get(ApiData.url+'/usuario/ObtenerUsuarios'/*, {
		headers: {Authorization: 'Bearer '+auth.getToken()}
	}*/).then(function(response){
		data = response.data;
		
		$scope.usuarios = data;
	});

	$scope.deleteUser = function(id){
		$http.delete(ApiData.url+'/usuario/EliminarUsuarioPorID/' + id)
		// $state.go('app.usuarios', {}, {reload: true});
		$state.reload('app.usuarios');
		
	};

	$scope.vistaPerfil = function(id){
		$state.go('app.perfil', {
        	id: id
      	})
		
	};


})

.controller('PartidasController', function($scope, $http, ApiData, $state) {
	$scope.partidas = [];
  
	$http.get(ApiData.url+'/partida/ObtenerPartidas'/*, {
		headers: {Authorization: 'Bearer '+auth.getToken()}
	}*/).then(function(response){
		data = response.data;
		
		$scope.partidas = data;
	});
})

.controller('PerfilController', function($scope, $http, ApiData, $state) {
	$scope.usuario = {};
  
	$scope.perfil = function(id){
		$http.get(ApiData.url+'/usuario/ObtenerUsuarioPorID/' + id)
		.then(function(response){
			data = response.data;
			
			$scope.usuario = data;
		});
	}
})