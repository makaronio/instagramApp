'use strict';

/* Controllers */

var app = angular.module('phonecatApp', []);

//  The controller is simply a constructor function that takes a $scope parameter:
app.controller('PhoneListCtrl', ['$scope', '$http',
    function($scope, $http) {

        $http.get('phones/phones.json').success(function(data) {
            $scope.phones = data;
        });

        $scope.orderProp = 'age';
    }
]);