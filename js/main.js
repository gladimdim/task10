define(["angular", "angularRoute"], function(angular, ngRoute) {
	debugger;
	var app = angular.module("cmsApp", [
			"ngRoute"
		]
	);

	app.run(function($rootScope, $http) {
		$rootScope.name = "Dmytro";
		$http.get("data.json").success(function(response) {
			//lets rearrange tabs based on their order
			$rootScope.tabs = response.sort(function (a, b) {
				return a.order - b.order;
			});
			$rootScope.selectedTab = $rootScope.tabs[0];
		});
	});

	app.config(function($routeProvider) {
		$routeProvider
			.when("/dummyTable", {
				template: function($routeParams) {
					return "<div>{{this.message}}</div>";
				},
				controller: "routeController",
				resolve: {
					"Tabs": ["$q", "$http", function($q, $http) {
						var deferred = $q.defer();
						setTimeout(function() {
							deferred.resolve("yo");
						}, 300);
						return deferred.promise;
					}]
				}
			});
	});

	app.controller("cmsController", function($scope, $http, $route) {
		this.selectTab = function(tab) {
			$scope.selectedTab = tab;
		};
	});

	app.controller("routeController", function($scope, Tabs) {
		$scope.message = "You opened " + $scope.selectedTab.title;
	});
});