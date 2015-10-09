var app = angular.module("cmsApp", [
		"ui.bootstrap",
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
			controller: "routeController"
		});
});

app.controller("cmsController", function($scope, $http, $route) {
	this.selectTab = function(tab) {
		$scope.selectedTab = tab;
	};
});

app.controller("routeController", function($scope, $routeParams) {
	$scope.message = "You opened " + $scope.selectedTab.title;
});