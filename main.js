requirejs.config({
	paths: {
		"angular": "./bower_components/angular/angular",
		"angularRoute": "./bower_components/angular-route/angular-route",
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

//load app module then bootstrap application on document
//this is needed as our app/main module relies on async tasks
require(["app/main"], function(app) {
    require(["angular"], function(angular) {
	angular.element(document).ready(function() {
	    angular.bootstrap(document, ["cmsApp"]);
	});
    });
});
