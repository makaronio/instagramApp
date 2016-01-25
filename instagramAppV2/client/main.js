
/** App Module **/

var app = angular.module('instagramAppV2', ['angular-meteor', 'ngRoute']);

//  note: Providers can only be injected into config functions.
app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.
        when('/photos', {
            templateUrl: 'partials/photos.html',
            controller: 'PhoneListCtrl'
        }).
        when('/photos/:photoId', {
            templateUrl: 'partials/singlePhoto.html',
            controller: 'PhoneListCtrlV2'
        }).
        otherwise({
            redirectTo: '/photos'
        });
}]);

//  todo.notImplemented Add functionality for this controllers
app.controller('PhoneListCtrl', ['$scope', function($scope) {
    console.log("");
}]);
app.controller('PhoneListCtrlV2', ['$scope', function($scope) {
    console.log("");
}]);


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
    $scope.headerText = "Photos";
    $scope.viewType = "table";
    $scope.viewURL = "views/tableView.html";

    $scope.onChangeView = function(viewType) {
        if (viewType === "table") {
            $scope.viewURL = "views/tableView.html"
        } else {
            $scope.viewURL = "views/gridView.html"
        }

    };

}]);



app.controller('userInfoCtrl', ['$scope', '$meteor', function($scope, $meteor) {
    //  todo.bug: different contexts
    $scope.photos = $meteor.collection(Photos);

    $scope.newPhoto = {
        description: "",
        imageURL: "",
        inputFile: {}
    };


    $scope.addPhoto = function() {
        var file = $(".myFileInput")[0].files[0];

        $scope.photos.push({
            description: $scope.newPhoto.description,
            imageURL: $scope.newPhoto.imageURL,
            createdAt: new Date()
        });

        Images.insert(file, function (err, fileObj) {
            if (err) {
                // handle error
            } else {
                setTimeout(function() {
                    $scope.photos.forEach(function (obj) {
                        console.log(obj.description);

                        if (obj.description === $scope.newPhoto.description) {
                            obj.imageURL = "/cfs/files/images/" + fileObj._id;
                        }
                    });
                    $scope.photos.save();
                }, 1000);
            }
        });
    };

    $scope.uploadFile = function(e) {
        var files = e.target.files;
        $scope.newPhoto.inputFile = files[0];
    }

}])
