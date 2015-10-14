requirejs.config({
	paths: {
		"angular": "./library/angularjs/angular",
		"angularRoute": "./library/angular-route/angular-route",
		"app": "./js",
		"backbone": "./library/backbone-min",
		"jquery": "./library/jquery-2.1.4.min",
		"underscore": "./library/underscore-min"
	},
	shim: {
		"angular": {
			exports: "angular"
		},
		"angularRoute": ["angular"]
	}	
});


require(["angular"], function(angular) {
	//manually bootstrap ng-app "cmsApp" on whole doc
	//this is needed to resolve race condition when cmsApp is not
	//yet initialized but Angular tries to use it
	angular.element(document).ready(function() {
		angular.bootstrap(document, ["cmsApp"]);
	});
});

require(["app/main"]);