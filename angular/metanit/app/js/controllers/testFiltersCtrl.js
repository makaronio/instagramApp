var makaronApp = angular.module("makaronApp");

//  custom filter
makaronApp.filter('formatText', function() {
    return function(text) {
        if (text.indexOf("фигасе") !== -1) {
            return "***";
        } else {
            return text;
        }
    };
});