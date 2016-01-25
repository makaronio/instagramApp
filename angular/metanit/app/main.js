var makaronApp = angular.module("makaronApp", ['ngSanitize'])
    .run(function($rootScope) {
        $rootScope.moduleName = "makaronApp";
    });
