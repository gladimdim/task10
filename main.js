requirejs.config({
	paths: {
		"angular": "./library/angularjs/angular.min",
		"angularRoute": "./library/angular-route/angular-route.min",
		"app": "./js"
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