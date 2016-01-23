
/** App Module **/

var app = angular.module('instagramAppV2', ['angular-meteor']);

//  todo.howItWorks
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

        var uri = "https://scontent-frt3-1.cdninstagram.com/hphotos-xfa1/t51.2885-19/10706773_293591184165151_1457379156_a.jpg";

        $scope.photos.push( {
            description: $scope.newPhoto.description,
            imageURL: $scope.newPhoto.imageURL,
            createdAt: new Date()
        });

        /**
        setTimeout(function() {
            $scope.photos.forEach(function (obj, i, list) {
                console.log(obj.description);

                if (obj.description === $scope.newPhoto.description) {
                    obj.imageURL = uri;
                }
            });
            $scope.photos.save();
        }, 1000);
         */


        var file = $(".myFileInput")[0].files[0];

        Images.insert(file, function (err, fileObj) {
            if (err) {
                // handle error
            } else {
                $scope.photos.forEach(function (obj) {
                    console.log(obj.description);

                    if (obj.description === $scope.newPhoto.description) {
                        obj.imageURL = "/cfs/files/images/" + fileObj._id;
                    }
                });
                $scope.photos.save();
            }
        });

    };

    $scope.uploadFile = function(e) {
        var files = e.target.files;
        $scope.newPhoto.inputFile = files[0];
    }

}]);