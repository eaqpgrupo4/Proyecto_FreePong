
usuarioregistradoApp.controller('vistaMesasCtrl',['$scope','$http','NgMap',function($scope,$http,NgMap)
{
    var vm = this;

    NgMap.getMap().then(function(map)
    {
        $http.get('/mesa/ObtenerMesas').success(function (data)
        {
            var mesas= data;
            vm.mesas= mesas;
            console.log(map);
        });
        vm.showCustomMarker= function(event,nombre)
        {
            console.log(nombre);
            map.customMarkers[nombre].setVisible(true);
            map.customMarkers[nombre].setPosition(this.getPosition());
        };
        vm.closeCustomMarker= function(evt)
        {
            this.style.display = 'none';
        };
        vm.horarios = function(event,id){
            console.log(id);
            $state.go('crearPartida',{id:id});

        }
    });

    }]);