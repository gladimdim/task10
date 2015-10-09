var app = angular.module("cmsApp", [
		"ui.bootstrap",
		"ngRoute"
	]
);

app.run(function($rootScope) {
	$rootScope.name = "Dmytro";
});

app.config(function($routeProvider) {
	$routeProvider
		.when("/dummyTable", {
			templateUrl: "tabs/dummyTable.html",
			controller: "cmsController"
		});
});

function jsonp_callback(data) {
	console.log(data);
}
app.controller("cmsController", function($scope, $http) {
	$http.get("data.json").success(function(response) {
		//lets rearrange tabs based on their order
		$scope.tabs = response.sort(function (a, b) {
			return a.order - b.order;
		});
	});

	this.selectTab = function(tab) {
		this.tabId = tab;
	};
});