requirejs.config({
	paths: {
		"angular": "./library/angularjs/angular.min",
		"angularRoute": "./library/angular-route/angular-route.min",
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
	},
	deps: ["main"]
});

requirejs(["app/main"]);