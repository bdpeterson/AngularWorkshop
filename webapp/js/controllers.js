/**
 * Created by bpeterson on 1/22/14.
 */


"use strict";

// First argument matches the ng-app directive in index.html.
var restaurantReservationControllers = new angular.module('restaurantReservationControllers', []);

// RestaurantListController is the ng-controller value in index.html. It identifies the DOM element that this controller 'controls'
// This can be done a couple different ways. However, this way supports minification and tends to be the preferred method.
restaurantReservationControllers.controller('RestaurantListController', ['$scope', '$http',
    function ($scope, $http) {

        // Use the Angular http service to retrieve the Restaurants.
        $http.get('/restaurants').success(function (data) {
            $scope.restaurants = data;
        });

        $scope.orderProp = 'name'; // Defaults the order property to the Name value.

    }]);

restaurantReservationControllers.controller('RestaurantDetailController', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {
        $http.get('/restaurants/' + $routeParams.id).success(function (data) {
            $scope.restaurant = data;
        });
        $http.get('/restaurants/'+$routeParams.id+'/reservations').success(function(data){
            $scope.available = data.available;
        });

        $scope.selectTime= function(selectedTime){
            $scope.selectedTime = selectedTime;
        };

    }]);

