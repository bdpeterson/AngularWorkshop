/**
 * Created by bpeterson on 1/23/14.
 */

angular.module('formatters', []).
    filter('dateFormatter', function() {               // filter is a factory function
        return function(unformattedDate, emptyStrText) { // first arg is the input, rest are filter params
            var date = new Date(1 * unformattedDate);
            var formattedDate = date.toLocaleTimeString();
            // Take the last 3 chars and the first 2 pairs of separated by colon.
            var segments = formattedDate.split(':',2);
            formattedDate = segments[0]+':'+segments[1] + formattedDate.substring(formattedDate.length-3);
            if(formattedDate === "" && emptyStrText) {
                formattedDate = emptyStrText;
            }
            return formattedDate;
        }
    });