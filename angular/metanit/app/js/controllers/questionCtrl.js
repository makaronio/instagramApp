var makaronApp = angular.module("makaronApp");

makaronApp.controller('questionCtrl', function($scope) {

    //  set
    $scope.questionOrderBy = "-rate";

    $scope.question = {
        text: 'Какой js-фреймворк лучше использовать?',
        author: 'Иван Иванов',
        date: '20/10/2013',
        answers:[
            {
                text: 'AngularJS!',
                author: 'Вова Сидоров',
                date: '20/10/2013',
                rate: 2
            },
            {
                text: 'AngularJS лучше всех',
                author: 'Олег Кузнецов',
                date: '20/10/2013',
                rate: 0
            },
            {
                text: 'Я бы использовал knockout',
                author: 'Неизвестный',
                date: '21/10/2013',
                rate: 0
            },
            {
                text: 'Я использовал Backbone',
                author: 'Неизвестный',
                date: '21/10/2015',
                rate: 5
            },
            {
                text: 'фигасе квестшен',
                author: 'Неизвестный',
                date: '22/10/2013',
                rate:0
            }
        ]
    };

    $scope.voteUp = function (answer){
        answer.rate++;
    };
    $scope.voteDown = function (answer){
        answer.rate--;
    };

    $scope.questColorClass= "questcolor";

    $scope.changeClass = function (e) {
        $scope.questColorClass = e.type == "mouseover" ? "questselectedcolor" : "questcolor";
    }

    //  play with directives
    $scope.valueFromScope = 55;
});

makaronApp.controller('answerCtrl', function($scope) {
    $scope.save = function(answer, answerForm) {
        if(answerForm.$valid){
            // действия по сохранению
            alert(answer.author + ", ваш ответ сохранен");
        }
    };
});