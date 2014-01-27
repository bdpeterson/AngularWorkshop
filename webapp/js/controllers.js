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

restaurantReservationControllers.controller('ReservationDetailController', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {
        $http.get('/reservations/'+$routeParams.id).success(function(data){
            $scope.reservation = data;
            $http.get('/restaurants/'+data.restaurantId).success(function (data){
                $scope.restaurant = data;
            });
        })
    }]);


restaurantReservationControllers.controller('RestaurantDetailController', ['$scope', '$http', '$routeParams', '$location',
    function ($scope, $http, $routeParams, $location) {
        $scope.reservation;

        $http.get('/restaurants/' + $routeParams.id).success(function (data) {
            $scope.restaurant = data;
        });
        $http.get('/restaurants/' + $routeParams.id + '/reservations').success(function (data) {
            $scope.available = data.available;
        });

        $scope.selectTime = function (selectedTime) {
            $scope.selectedTime = selectedTime;
        };

        $scope.makeReservation = function () {
            if ($scope.reservation){
                $scope.reservation.restaurantId = $scope.restaurant.id;
                $scope.reservation.time = $scope.selectedTime;
            }

            $http.post('/reservations', $scope.reservation).success(function (data) {
                console.log([data.id]);
                $location.path("/reservation/" + data.id);
            })
        };


    }]);

