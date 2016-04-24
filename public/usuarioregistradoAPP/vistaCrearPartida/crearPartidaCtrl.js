
usuarioregistradoApp.controller('crearPartidaCtrl', ['$state','$http','$scope','$cookies','dateFilter',function($state, $http ,$scope,$cookies,dateFilter){
    $scope.date = dateFilter(new Date(), 'yyyy-MM-dd');
    $scope.minDate = '2015-10-06';

}]);

