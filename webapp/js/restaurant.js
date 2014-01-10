/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 © NVISIA, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Created by bpeterson on 1/9/14.
 */

(function(){
    "use strict";

    var RestaurantModule = {};
    window.RestaurantModule = RestaurantModule;

    RestaurantModule.Restaurant = Backbone.Model.extend({
        defaults: {
            name: "undefined",
            location: "",
            reservations: [],
            availableTimes: []
        },
        urlRoot: "/restaurants",
        fetchReservations: function() {
            if (!this.has('id')) {
                return;
            }

            $.ajax('/restaurants/' + this.get('id') + '/reservations', {
                context: this,
                success: function(response) {
                    this.set('reservations', response.reservations);
                    this.set('availableTimes', response.available);
                },
                failure: function() {
                    console.log(['Something strange is afoot', arguments]);
                }
            });
        }
    });

    RestaurantModule.RestaurantList = Backbone.Collection.extend({
        model:RestaurantModule.Restaurant,
        url:"/restaurants"
    });

    RestaurantModule.RestaurantView = Backbone.View.extend({
        initialize: function () {
            this.template = Handlebars.templates.restaurantList;
            this.restaurants = new RestaurantModule.RestaurantList();
            this.restaurants.on("all",this.render, this);
            this.restaurants.fetch();
        },
        render: function () {
            this.$el.html(this.template({count:this.count(),restaurant:this.restaurants.toJSON()}));
            return this;
        },
        count : function() {
            return this.restaurants.length;
        }
    });

    return RestaurantModule;
})();
