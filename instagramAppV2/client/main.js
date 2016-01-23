
/** App Module **/

var app = angular.module('instagramAppV2', ['angular-meteor']);

app.directive('customOnChange', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeFunc = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeFunc);
        }
    };
});

app.controller('photoListCtrl', ['$scope', '$meteor', function($scope, $meteor) {

    //  We are using the $meteor service
    //  to bind our Photos collection to our $scope.photos variable
    $scope.photos = $meteor.collection(Photos);
}]);

app.controller('photoListHeaderCtrl', ['$scope', '$meteor', function($scope, $meteor) {

    //  todo.bug: different contexts
    $scope.photos = $meteor.collection(Photos);

    $scope.headerText = "Photos";
    $scope.newPhoto = {
        description: "",
        imageURL: "",
        inputFile: {}
    };


    $scope.addPhoto = function() {
        var file = $scope.newPhoto.inputFile;

        $scope.photos.push( {
            description: $scope.newPhoto.description,
            imageURL: $scope.newPhoto.imageURL,
            createdAt: new Date()
        });

        $scope.newPhoto = {
            description: "",
            imageURL: "",
            inputFile: {}
        };
    };

    $scope.uploadFile = function(e) {
        var files = e.target.files;
        var file = $scope.newPhoto.inputFile = files[0];

        Images.insert(file, function (err, fileObj) {
            if (err) {
                // handle error
            } else {
                $scope.newPhoto.imageURL = "/cfs/files/images/" + fileObj._id;
            }
        });
    }

}]);