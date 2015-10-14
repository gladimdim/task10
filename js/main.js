define(["angular", "angularRoute"], function(angular, ngRoute) {
    var app = angular.module("cmsApp", ["ngRoute"]);

    app.config(function($routeProvider) {
        //save the reference to routeProviderRef so later in app.run
        //we can add routes dynamically.
        $routeProviderRef = $routeProvider;
    });

    app.run(function($route, $rootScope, $http) {
        $http.get("data.json").success(function(response) {
            //lets rearrange tabs based on their order
            $rootScope.tabs = response.sort(function (a, b) {
                return a.order - b.order;
            });
	    //init with first tab
	    $routeProviderRef.when("/", {
		template: "<div ng-bind-html='renderUnsafeHtml(this.viewHTML);'>{{this.viewHTML}}</div>",
		controller: "routeController",
		resolve: {
		    "Tabs": ["$q", function($q) {
			var deferred = $q.defer();
			require([response[0].path], function(module) {
			    deferred.resolve(module);
			});
			return deferred.promise;
		    }
		    ]
		}
	    });
            response.forEach(function(el) {
                $routeProviderRef
                .when("/" + el.id, {
                    template: function() {
                        return "<div ng-bind-html='renderUnsafeHtml(this.viewHTML);'>{{this.viewHTML}}</div>";
                    },
                    controller: "routeController",
                    resolve: {
                        "Tabs": ["$q", function($q) {
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
    });

    app.controller("routeController", function($scope, Tabs, $sce) {
        $scope.viewHTML = Tabs.render().el.outerHTML;

        $scope.renderUnsafeHtml = function(h) {
            //let's hope we can trust received html
            return $sce.trustAsHtml(h);
        };
    });
});
