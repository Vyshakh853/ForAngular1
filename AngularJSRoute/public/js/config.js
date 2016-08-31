app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when("/add", { templateUrl: "pages/addEdit.html", controller: "addController" });
    $routeProvider.when("/load", { templateUrl: "pages/teableview.html" });
    $routeProvider.when("/edit", { templateUrl: "pages/addEdit.html", controller: "editController" });
    $routeProvider.when("/", { template: '' })
    $routeProvider.otherwise({ redirectTo: '/' });
    $locationProvider.html5Mode({ enabled: true, requireBase: false });
}]);
