var flApp = angular.module('flApp', []);

flApp.controller('SideMenuCtrl', function ($scope) {
    $scope.menuItems = [{
        'name': 'Main'
    }, {
        'name': 'Logbook'
    }];
});