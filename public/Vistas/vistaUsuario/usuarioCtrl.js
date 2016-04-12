
'use strict';
freepongApp.controller('usuarioCtrl', ['$stateParams','$state','$http','$scope','ngTableParams',function($stateParams,$state, $http ,$scope,ngTableParams ) {


    var id = $stateParams.id;
    var login = $stateParams.login;
    console.log(login);
    $scope.login = login;


}]);

