
/** App Module **/

var app = angular.module('instagramAppV2', ['angular-meteor']);

app.controller('photoListCtrl', ['$scope', '$meteor', function($scope, $meteor) {

    //  We are using the $meteor service
    //  to bind our Photos collection to our $scope.photos variable
    $scope.photos = $meteor.collection(Photos);
}]);



app.controller('photoListHeaderCtrl', ['$scope', '$meteor', function($scope, $meteor) {
    $scope.headerText = "Photos";

    $scope.newPhoto = {
        description: ""
    };



    //  todo.bug: different contexts
    $scope.photos = $meteor.collection(Photos);

    $scope.addPhoto = function() {
        $scope.photos.push( {
            description: $scope.newPhoto.description,
            createdAt: new Date()
        });
    }
}]);