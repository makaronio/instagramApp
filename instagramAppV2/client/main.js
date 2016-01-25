
/** App Module **/

var app = angular.module('instagramAppV2', ['angular-meteor', 'ngRoute']);



//  todo.note Providers can only be injected into config functions.
app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.
        when('/photos', {
            templateUrl: 'partials/photos.html',
            controller: function () {}
        }).
        when('/photos/:photoId', {
            templateUrl: 'partials/singlePhoto.html',
            controller: 'singlePhoto'
        }).
        otherwise({
            redirectTo: '/photos'
        });
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
}]);

app.controller('photosListCtrl', ['$scope', '$meteor', function($scope, $meteor) {
    //  We are using the $meteor service
    //  to bind our Photos collection to our $scope.photos variable
    $scope.photos = $meteor.collection(Photos);

    $scope.viewModes = [
        {
            name: "table"
        },
        {
            name: "grid"
        }
    ];

    //  set default viewMode
    $scope.currentViewMode = {
        mode: "table"
    };

    if (Session.get("viewMode")) {
        $scope.currentViewMode.mode = Session.get("viewMode");
    }

    $scope.setFile = function() {
        if ($scope.currentViewMode.mode === "table") {
            Session.set("viewMode", "table");
            return "views/tableView.html";
        } else if ($scope.currentViewMode.mode === "grid") {
            Session.set("viewMode", "grid");
            return "views/gridView.html";
        }
    };
}]);

app.controller('singlePhoto', ['$scope', '$meteor', '$route', function($scope, $meteor, $route) {
    //  todo.bug: different contexts
    $scope.photos = $meteor.collection(Photos);

    $scope.photos.forEach(function(obj) {
        if (obj._id === $route.current.params.photoId) {
            $scope.photo = obj;
            return true;
        }
    })

}]);



