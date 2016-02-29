/**
 * Created by chanaka on 2/25/16.
 */
module.factory('speakerService', function ($http) {

    var speakerService = {


        viewSpeakers: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: "api/speakers.json"
            }).then(function (response) {
                return response.data;
            });
        },
        addSpeaker: function (data) {
            return $http({
                method: "POST",
                data: data,
                headers: headers,
                url: host.customer + '/save'
            }).then(function (reponse) {
                return reponse.data;
            });
        }

    };
    return speakerService;
})
;