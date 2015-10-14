define(["angular", "angularRoute"], function(angular, ngRoute) {
    var app = angular.module("cmsApp", [
            "ngRoute"
        ]
    );

    app.config(function($routeProvider) {
        $routeProviderRef = $routeProvider;
    });

    app.run(function($route, $rootScope, $http) {
        $rootScope.name = "Dmytro";
        $http.get("data.json").success(function(response) {
            //lets rearrange tabs based on their order
            $rootScope.tabs = response.sort(function (a, b) {
                return a.order - b.order;
            });
            $rootScope.selectedTab = $rootScope.tabs[0];
            response.forEach(function(el) {
                $routeProviderRef
                .when("/" + el.id, {
                    template: function(urlattrs) {
                        return "<div>{{this.view}}</div>";
                    },
                    controller: "routeController",
                    resolve: {
                        "Tabs": ["$q", "$http", function($q, $http) {
                            var deferred = $q.defer();
                            require([el.path], function(module) {
                                deferred.resolve(module);
                            });
                            return deferred.promise;
                        }]
                    }
                });
            });
            
            $route.reload();
        });
    });



    app.controller("cmsController", function($scope, $http, $route) {
        this.selectTab = function(tab) {
            $scope.selectedTab = tab;
        };
    });

    app.controller("routeController", function($scope, Tabs) {
        $scope.view = Tabs;
    });
});