angular.module('volleyballApp.controllers', []).controller('teamsController', function($scope) {
    $scope.teamsList = [
      {
          Team: "Poland",
          points: 322,
          Constructors: [
              {name: "Red Bull"}
          ]
      },
      {
          Team: "France",
          points: 207,
          Constructors: [
              {name: "Ferrari"}
          ]
      },
      {
          Team: "Iran",
          points: 122,
          Constructors: [
              {name: "Ford"}
          ]
      },
    ];
});