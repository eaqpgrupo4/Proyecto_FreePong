
var _base = "http://localhost:3000";
angular.module('freepong', ['ionic', 'freepong.controllers', 'freepong.routes', 'freepong.services', 'freepong.directives', 'ngCordovaOauth', 'ngCordova', 'pickadate'])

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
  })
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
    }, 2000);
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
      getPartidasPorFechaID: function (id, fecha){
          console.log("id api: " + id);
          console.log("fecha api: " + fecha);
          console.log("query api: " + '/partida/ObtenerPartidaPorFechaymesa/' + id + '/' + fecha + '/');
          return $http.get(_base + '/partida/ObtenerPartidaPorFechaymesa/' + id + '/' + fecha + '/');
      },
      getMesas: function () {
          return $http.get(_base + '/mesa/ObtenerMesas');
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
    $state.reload();
    $state.go($state.current, {}, {reload: true});
    var idusuario = window.localStorage['idusuario'];
    var login = window.localStorage['login'];
    var apellidos = window.localStorage['apellidos'];
    var saldo = window.localStorage['saldo'];
    var nombre = window.localStorage['nombre'];
    var email = window.localStorage['email'];
    var telefono = window.localStorage['telefono'];
    var urlfoto = window.localStorage['urlfoto'];
    var created = window.localStorage['created'];
    $scope.id = idusuario;
    $scope.login = login;
    $scope.nombre = nombre;
    $scope.apellidos = apellidos;
    $scope.email = email;
    $scope.saldo = saldo;
    $scope.urlfoto = urlfoto;
    $scope.created = created;
    console.log("idusuario: "+idusuario);
    console.log("id: "+$scope.id);
    console.log("login: "+$scope.login);
})

.controller('MiPerfilController', ['$rootScope', '$state', '$scope', '$cordovaOauth', 'API', '$http', '$ionicModal', '$ionicHistory', function ($rootScope, $state, $scope, $cordovaOauth, api, $http, $ionicModal, $ionicHistory) {
    //Guardar datos en local Storage//
    var idusuario = window.localStorage['idusuario'];
    var login = window.localStorage['login'];
    var apellidos = window.localStorage['apellidos'];
    var saldo = window.localStorage['saldo'];
    var nombre = window.localStorage['nombre'];
    var email = window.localStorage['email'];
    var telefono = window.localStorage['telefono'];
    var urlfoto = window.localStorage['urlfoto'];
    var created = window.localStorage['created'];
    $scope.id = idusuario;
    $scope.login = login;
    $scope.nombre = nombre;
    $scope.apellidos = apellidos;
    $scope.email = email;
    $scope.saldo = saldo;
    $scope.urlfoto = urlfoto;
    $scope.created = created;
    console.log("idusuario: "+idusuario);
    console.log("id: "+$scope.id);
    console.log("id: "+$scope.login);
}])

.controller('LogoutController', ['$rootScope', '$state', '$scope', '$cordovaOauth', 'API', '$http', '$ionicModal', '$ionicHistory', function ($rootScope, $state, $scope, $cordovaOauth, api, $http, $ionicModal, $ionicHistory) {
    $scope.signout = function () {
      // window.localStorage['idusuario'] = '';
      // window.localStorage['login'] = '';
      // window.localStorage['saldo'] = '';
      // window.localStorage['nombre'] = '';
      // window.localStorage['apellidos'] = '';
      // window.localStorage['email'] = '';
      // window.localStorage['telefono'] = '';
      // window.localStorage['urlfoto'] = '';
      // window.localStorage['created'] = '';
      localStorage.clear();
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      $state.go('freepong.login');
    }
}])

.controller('BuscarPartidaController', ['$rootScope', '$state', '$scope', '$cordovaOauth', 'API', '$http', '$ionicModal', '$ionicHistory', function ($rootScope, $state, $scope, $cordovaOauth, api, $http, $ionicModal, $ionicHistory) {
    //Guardar datos en local Storage//
    var idusuario = window.localStorage['idusuario'];
    var login = window.localStorage['login'];
    $scope.partida = {
          usuarioID: '',
          usuarioLogin: '',
          fecha: '',
          mesaID: '',
          mesaNombre: '',
          mesaLoc: '',
          horario: ''
    };
    // var apellidos = window.localStorage['apellidos'];
    // var saldo = window.localStorage['saldo'];
    // var nombre = window.localStorage['nombre'];
    // var email = window.localStorage['email'];
    // var telefono = window.localStorage['telefono'];
    // var urlfoto = window.localStorage['urlfoto'];
    //Guardar datos en local Storage//
    // window.localStorage['idusuario'] = data.usuario[0]._id;
    // window.localStorage['login'] = data.usuario[0].login;
    // window.localStorage['saldo'] = data.usuario[0].saldo;
    // window.localStorage['nombre'] = data.usuario[0].nombre;
    // window.localStorage['apellidos'] = data.usuario[0].apellidos;
    // window.localStorage['email'] = data.usuario[0].email;
    // window.localStorage['telefono'] = data.usuario[0].telefono;
    console.log(idusuario);
    console.log(login);
    console.log("El Usuario creador de la partida es: "+login+" con id: "+idusuario);
    $scope.verusuario ="Local: "+login+" id: "+idusuario;
    $scope.partida.usuarioID = idusuario; 
    $scope.partida.usuarioLogin = login;
    $ionicModal.fromTemplateUrl('templates/datemodal.html', 
        function(modal) {
            $scope.datemodal = modal;
        },
        {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope, 
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
        }
    );
    $scope.opendateModal = function() {
      $scope.datemodal.show();
    };
    $scope.closedateModal = function(modal) {
      $scope.datemodal.hide();
      $scope.datepicker ="Fecha: "+modal;
      $scope.partida.fecha = modal;
      console.log(modal);
      console.log("la fecha es: "+modal);
    };
    api.getMesas().success(function (data) {
        console.log(data);
        $scope.mesas = data;
        // console.log(mesas);
      }).error(function(data){
    })  
    $ionicModal.fromTemplateUrl('templates/datemodalmesas.html', 
        function(mesa) {
            $scope.datemodalM = mesa;
        },
        {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope, 
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
        }
    );
    $scope.opendateModalM = function() {
      $scope.datemodalM.show();
    };
    $scope.closedateModalM = function(mesa) {
      $scope.datemodalM.hide();
      $scope.vermesas = mesa.nombre+" - "+mesa.localizacion;
      $scope.partida.mesaNombre = mesa.nombre;
      $scope.partida.mesaLoc = mesa.localizacion;
      $scope.partida.mesaID = mesa._id;
      console.log("La mesa es: "+mesa.nombre);
      console.log(mesa);
    };
    $scope.enviarPartida = function (){
      // console.log("Entro");
      // console.log("Objeto Partida: "+$scope.partida);
      // console.log("Objeto Partida.usuarioLogin: "+$scope.partida.usuarioLogin);
      // console.log("Objeto Partida.usuarioID: "+$scope.partida.usuarioID);
      // console.log("Objeto Partida.fecha: "+$scope.partida.fecha);
      // console.log("Objeto Partida.mesaID: "+$scope.partida.mesaID);
      // console.log("Objeto Partida.mesaNombre: "+$scope.partida.mesaNombre);
      // console.log("Objeto Partida.mesaLoc: "+$scope.partida.mesaLoc);
      var mesaID = $scope.partida.mesaID;
      var fecha = $scope.partida.fecha;
      api.getPartidasPorFechaID(mesaID, fecha).success(function (data) {
        $rootScope.toast2('Cargando partidas...');
        $scope.partidas = data;
        // console.log('----------------------------------------');
        // console.log('Objeto Partida - partidas: '+$scope.partidas);
        // console.log('Objeto Partida - idpartida: '+$scope.partidas[0]._id);
        // console.log('Objeto Partida - IDmesa: '+$scope.partidas[0].IDmesa);
        // console.log('Objeto Partida - FechaPartida: '+$scope.partidas[0].FechaPartida);
        // console.log('Objeto Partida - creadorLogin: '+$scope.partidas[0].P3.creador.login);
        // console.log('Objeto Partida - invitadoLogin: '+$scope.partidas[0].P3.invitado.login);
        // console.log('----------------------------------------');
        }).error(function (data) {
      })
    }
}])

.controller('CrearPartidaController', ['$rootScope', '$state', '$scope', '$cordovaOauth', 'API', '$http', '$ionicModal', '$ionicHistory', function ($rootScope, $state, $scope, $cordovaOauth, api, $http, $ionicModal, $ionicHistory) {
    //Guardar datos en local Storage//
    $scope.verHorarios=false;
    $scope.verPartida=false;
    var idusuario = window.localStorage['idusuario'];
    var login = window.localStorage['login'];
    $scope.partida = {
          usuarioID: '',
          usuarioLogin: '',
          fecha: '',
          mesaID: '',
          mesaNombre: '',
          mesaLoc: '',
          horario: ''
    };
    console.log(idusuario);
    console.log(login);
    console.log("El Usuario creador de la partida es: "+login+" con id: "+idusuario);
    $scope.verusuario ="Local: "+login+" id: "+idusuario;
    $scope.partida.usuarioID = idusuario; 
    $scope.partida.usuarioLogin = login;
    $ionicModal.fromTemplateUrl('templates/datemodal.html', 
        function(modal) {
            $scope.datemodal = modal;
        },
        {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope, 
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
        }
    );
    $scope.opendateModal = function() {
      $scope.datemodal.show();
    };
    $scope.closedateModal = function(modal) {
      $scope.datemodal.hide();
      $scope.datepicker ="Fecha: "+modal;
      $scope.partida.fecha = modal;
      console.log(modal);
      console.log("la fecha es: "+modal);
    };
    api.getMesas().success(function (data) {
        console.log(data);
        $scope.mesas = data;
        // console.log(mesas);
      }).error(function(data){
    })  
    $ionicModal.fromTemplateUrl('templates/datemodalmesas.html', 
        function(mesa) {
            $scope.datemodalM = mesa;
        },
        {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope, 
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
        }
    );
    $scope.opendateModalM = function() {
      $scope.datemodalM.show();
    };
    $scope.closedateModalM = function(mesa) {
      $scope.datemodalM.hide();
      $scope.vermesas = mesa.nombre+" - "+mesa.localizacion;
      $scope.partida.mesaNombre = mesa.nombre;
      $scope.partida.mesaLoc = mesa.localizacion;
      $scope.partida.mesaID = mesa._id;
      console.log("La mesa es: "+mesa.nombre);
      console.log(mesa);
    };
    $scope.obtenerHorarios = function(){
      var mesaID = $scope.partida.mesaID;
      var fecha = $scope.partida.fecha;
      var login = $scope.partida.usuarioLogin;
      api.getPartidasPorFechaID(mesaID, fecha).success(function (data) {
        $rootScope.toast2('Cargando horarios...');
        //console.log("data222: "+data[0]._id);
        if(data[0]==null){
            console.log("entro data: ");
            $scope.verHorarios=true;
            $scope.verPartida=false;
        }
        else{
            $scope.partidas=data;
            console.log("entro else: ");
            $scope.verHorarios=false;
            $scope.verPartida=true;
        }
      })
    }
    $scope.crearPartida = function(creador, invitado, index){
      console.log('creador  P'+index+': '+creador);
      console.log('invitado P'+index+': '+invitado);
      if(creador==null && invitado==null){
        console.log('no hay usuario creador ni usuario invitado');
        console.log('__________________________________________');
        $scope.crearUnaPartida = function(){
          //Crear partida

        }
      } else if(invitado==null){
          console.log('no hay usuario invitado pero si creador');
          console.log('________________________________________');
          $scope.unirsePartida = function(){
            //unirse a partida
            
          } 
      } else{
          console.log('Partida cerrada!');
          console.log('________________________________________');
      }
    }
}])

.controller('LoginController', ['$rootScope', '$state', '$scope', '$cordovaOauth', 'API', '$http', '$ionicModal', '$ionicHistory', function ($rootScope, $state, $scope, $cordovaOauth, api, $http, $ionicModal, $ionicHistory) {
  $scope.log = {
      login: '',
      password: ''
  }
  $scope.loginUser = function () {
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
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
          var id = data.usuario[0]._id;
          window.localStorage['idusuario'] = data.usuario[0]._id;
          window.localStorage['login'] = data.usuario[0].login;
          console.log("id: "+id);
          api.getUsuario(id).success(function (data) {
              usuario = {};
              $scope.usuario = data;
              console.log("data: "+data._id);
              console.log("data: "+data.nombre);
              console.log("data: "+data.urlfoto);
              console.log("usuario: "+$scope.usuario);
              console.log("usuario2: "+$scope.usuario.nombre);
              window.localStorage['saldo'] = data.saldo;
              window.localStorage['nombre'] = data.nombre;
              window.localStorage['apellidos'] = data.apellidos;
              window.localStorage['email'] = data.email;
              window.localStorage['telefono'] = data.telefono;
              window.localStorage['urlfoto'] = data.urlfoto;
              window.localStorage['created'] = data.created;
            }).error(function(data){
          })
            // $rootScope.toast('bienvenido ' + usuario.login);

            //Guardar datos en local Storage//
            // window.localStorage['iduser'] = data.usuario[0]._id;
            // window.localStorage['username'] = data.usuario[0].login;
            // window.localStorage['saldo'] = data.usuario[0].saldo;
            // window.localStorage['nombre'] = data.usuario[0].nombre;
            // window.localStorage['apellidos'] = data.usuario[0].apellidos;
            // window.localStorage['email'] = data.usuario[0].email;
            // window.localStorage['telefono'] = data.usuario[0].telefono;
              
            // usuario.id = data.usuario[0]._id;
            // usuario.nombre = data.usuario[0].nombre;
            // usuario.apellidos = data.usuario[0].apellidos;
            // usuario.login = data.usuario[0].login;
            // usuario.email = data.usuario[0].email;
            // usuario.telefono = data.usuario[0].telefono;
            // usuario.saldo = data.usuario[0].saldo;
            // socket.emit('newUser', usuario, function (data) {
            // });
            $ionicHistory.nextViewOptions({
              disableBack: true 
            });
            $scope.log = {}
            $state.go('freepong.usuarios');
            // $state.go('freepong.usuarios', {}, {reload: true});
          }).error(function (data) {
            $rootScope.toast('Usuario o password incorrecto');
        })
      }
    }

     $scope.facebookLogin = function () {
        $cordovaOauth.facebook("204093466640429", ["email", "user_location"]).then(function (result) {
            $localStorage.accessToken = result.access_token;
            console.log(result);
            $rootScope.tipologin = "facebook";
            $state.go('freepong.usuarios');
        }, function (error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    };

    $scope.twitterLogin = function () {
        var api_key = "YApyMEj0kbItom0k5n5ohZOIo";
        var api_secret = "6qGv57d6ur4veWePl6RTjrgr75aKWXe1jaclQAsyfQfZtMoRqh";
        $cordovaOauth.twitter(api_key, api_secret, ["email"]).then(function (user) {
                $rootScope.usuariotwitternombre = user.screen_name;
                $rootScope.usuariotwitterid = user.user_id;
                console.log(user);
                $rootScope.tipologin = "twitter";

                $state.go('freepong.usuarios');
            },
            function (error) {
              alert("There was a problem signing in!  See the console for logs");
                console.log(error);
            });
    };
    $scope.registro = function () {
      $state.go('freepong.registro');
    }
    $scope.registro = function () {
      $state.go('freepong.registro');
    }
}])

.controller('registroController', ['$rootScope', '$state', '$scope', '$cordovaOauth', 'API', '$http', '$ionicModal', function ($rootScope, $state, $scope, $cordovaOauth, api, $http, $ionicModal) {
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
        $state.go('freepong.notificaciones');
        $scope.usuario = {}
      }).error(function (data) {
        $rootScope.hideLoading();
        $rootScope.toast('El usuario ya existe');
        $scope.usuario = {}
      })
    }
}])
            //   api.getUsuarios().success(function (data) {
            // ****$scope.usuarios.splice(0,1);  //= data;
            // }).error(function(data){
            // })
       
.controller('UsuariosController', ['$rootScope', '$scope', '$http', '$state', 'API', '$stateParams', function($rootScope, $scope, $http, $state, api, $stateParams) {
	api.getUsuarios().success(function (data) {
			$rootScope.toast2('Cargando usuarios...');
			$scope.usuarios = data;
		}).error(function(data){
	})
  $scope.deleteUser = function(id){
    $rootScope.toast2('Borrando usuario...');
    $http.delete(_base+'/usuario/EliminarUsuarioPorID/' + id).success(function (data){
          api.getUsuarios().success(function (data) {
            $scope.usuarios = data;
          }).error(function(data){
        })
      }).error(function (data) {
    })
  };
	$scope.vistaPerfil = function(id){
    //window.localStorage['id'] = id;
		console.log(id);
    $state.go('freepong.perfil', {
        id:id
    });
	};
}])

.controller('PartidasController', ['$rootScope', '$scope', '$http', '$state', 'API', function($rootScope, $scope, $http, $state, api) {
	api.getPartidas().success(function (data) {
			$rootScope.toast2('Cargando partidas...');
			$scope.partidas = data;
		}).error(function(data){
	})	
}])

.controller('MesasController', ['$rootScope', '$scope', '$http', '$state', 'API', function($rootScope, $scope, $http, $state, api) {
  api.getMesas().success(function (data) {
      $rootScope.toast2('Cargando mesas...');
      $scope.mesas = data;
    }).error(function(data){
  })  
}])

.controller('PosicionController', function ($scope, $cordovaGeolocation, $ionicLoading) {
    ionic.Platform.ready(function () {
      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Buscando localización'
      });
      var posOptions = {
        enableHighAccuracy: true,
        timeout: 17000,
        maximumAge: 0
      };
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var myLatlng = new google.maps.LatLng(lat, long);
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        $scope.map = map;
        $ionicLoading.hide();
        google.maps.event.addListenerOnce($scope.map, 'idle', function () {
          var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: myLatlng
          });
          var infoWindow = new google.maps.InfoWindow({
            content: "Estás aquí!"
          });
          google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open($scope.map, marker);
          });
        });
      }, function (err) {
        $ionicLoading.hide();
        console.log(err);
      });
    });
})

.controller('PerfilController', ['$rootScope', '$scope', '$http', '$state', 'API', '$stateParams', function($rootScope, $scope, $http, $state, api, $stateParams) {
	//var id = window.localStorage['id'];
  var id = $stateParams.id;
	api.getUsuario(id).success(function (data) {
			$rootScope.toast2('Cargando el perfil de ' + data.login);
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


////////////http://www.citronlab.com/programacion/ionic-ejemplo-de-aplicacion-tipo-tabs/

// angular.module('starter.services', [])
 
// .factory('Tareas', ['$http', '$q', function($http, $q){
 
//   /* 
//     json con tareas de ejemplo precargadas 
//   */
//   var jsonTareas = [
//     {"id": 0, "titulo": "Ir a la compra","texto": "Refrescos, Patatas fritas"},
//     {"id": 1, "titulo": "Arreglar estantería baño","texto": "Se caen los botes de champú"}, 
//     {"id": 2, "titulo": "Cortar pelo perro","texto": "Parece una oveja"}
//   ];
 
//   return {
//     /* 
//       devuelve todas las tareas 
//     */
//     tareasListado: function() {
//       return jsonTareas;
//     },
 
//     /* 
//       borra la tarea del json que se indique 
//     */
//     tareasBorrar: function(tarea) {
//       jsonTareas.splice(jsonTareas.indexOf(tarea), 1);
//     },
 
     
//       recorre el json de tareas hasta dar con la que tiene el 
//       nodo id igual que el proporcionado y lo devuelve 
    
//     tareasDetalle: function(tareaId) {
//       for (var i = 0; i < jsonTareas.length; i++) {
//         if (jsonTareas[i].id === parseInt(tareaId)) {
//           return jsonTareas[i];
//         }
//       }
//       return null;
//     },
 
//     /* 
//       crea una nueva tarea en el json en base a los 
//       parámetros porporcionados 
//     */
//     tareasNueva: function(titulo,texto) {
//       jsonTareas.push({"id": this.tareasNextId(), "titulo": titulo, "texto": texto});
//     },
 
//     /* 
//       averigua el maximo "id" y devuelve un valor 
//        superior para el alta de una nueva tarea 
//     */
//     tareasNextId: function() {
//       var maxValue=0;
//       for (var i = 0; i < jsonTareas.length; i++) {
//         if (jsonTareas[i].id > maxValue) {
//           maxValue=jsonTareas[i].id;
//         }
//       }
//       return maxValue+1;
//     },
 
//   };
//   return this;
//   }
// ])


