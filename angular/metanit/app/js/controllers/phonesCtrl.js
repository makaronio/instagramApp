var makaronApp = angular.module("makaronApp");

makaronApp.controller('phoneListCtrl', function($scope) {
    $scope.phones = [
        {
            name: "Nokia",
            price: 150
        },
        {
            name: "Samsung",
            price: 250
        }
    ];
    $scope.tablets = [
        {
            name: "Asus",
            price: 200
        },
        {
            name: "IPad",
            price: 400
        }
    ];

    $scope.modes = [
        {
            value: 'Tablets',
            label: 'Планшеты'
        },
        {
            value: 'Phones',
            label: 'Смартфоны'
        }
    ];

    //  set initial value
    $scope.data = {
        mode: 'Phones'
    };

    $scope.setFile = function() {
        //  todo.bug repeating call
        console.log($scope.data.mode);
        if ($scope.data.mode === "Tablets") {
            return './partials/tabletsList.html';
        } else if ($scope.data.mode === "Phones") {
            return './partials/phonesList.html';
        }
    }
});


