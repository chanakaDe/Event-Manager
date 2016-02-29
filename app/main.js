/**
 * Created by chanaka on 8/27/15.
 */
var module = angular.module('event_manager', ['ngRoute']);

/**
 * Creating system routes with Angular Routes
 */
module.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'app/view/dashboard.html',
            controller: ''
        }).when('/addSession', {
            templateUrl: 'app/view/session/addSession.html',
            controller: ''
        }).when('/viewSessions', {
            templateUrl: 'app/view/session/viewSession.html',
            controller: ''
        }).when('/addSpeaker', {
            templateUrl: 'app/view/speaker/addSpeaker.html',
            controller: ''
        }).when('/viewSpeaker', {
            templateUrl: 'app/view/speaker/viewSpeaker.html',
            controller: ''
        }).when('/addTrack', {
            templateUrl: 'app/view/track/addTrack.html',
            controller: ''
        }).when('/addSponsor', {
            templateUrl: 'app/view/sponsor/addSponsor.html',
            controller: ''
        }).otherwise({
            redirectTo: '/'
        });
});

/**
 * Added only numbers module.
 */
module.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                if (val) {
                    var digits = val.replace(/[^0-9.-]/g, '');

                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits, 10);
                }
                return undefined;
            }

            ctrl.$parsers.push(inputValue);
        }
    };
});

module.directive('myMap', function () {
    // directive link function
    var link = function (scope, element, attrs) {
        var map, infoWindow;
        var markers = [];

        // map config
        var mapOptions = {
            center: new google.maps.LatLng(50, 2),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };

        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }

        // place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array

            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }

        // show the map and place some markers
        initMap();

        setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
        setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
        setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
    };

    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
});

/**
 * Creating shortcut directive.
 */
module.controller('Ctrl', function ($scope, $location) {


});

var headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};
