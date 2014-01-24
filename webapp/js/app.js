var restaurantReservationApp = angular.module('restaurantReservationApp', [
    'ngRoute',
    'restaurantReservationControllers',
    'formatters'
]);

restaurantReservationApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/restaurants', {
                templateUrl: 'partials/restaurant-list.html',
                controller: 'RestaurantListController'
            })
            .when('/restaurant/:id',{
                templateUrl:'partials/restaurant-detail.html',
                controller:'RestaurantDetailController'
            })
            .otherwise({
                redirectTo: '/restaurants'
            });
    }]);