/**
 * Created by carlos on 19/04/2016.
 */
'use strict';

    freepongApp.controller('NavbarCtrl', ['$state','$http','$scope','$location','$rootScope',function($state, $http ,$scope, $location,$rootScope){


       if ($location.path()== 'admin'){
           console.log('entro admin');
           $rootScope.con1==true;}
        if ($location.path()== 'login'){$rootScope.con2==true;}
}]);