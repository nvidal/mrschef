app = angular.module('MrsChefApp', ['ngRoute','ngMaterial']);

// Configuracion de la rutas de la app.
app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl : 'partials/home.html',
		})
		.otherwise({
			redirectTo : '/'
		});
}]);
