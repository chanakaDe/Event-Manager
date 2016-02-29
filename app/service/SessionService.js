/**
 * Created by chanaka on 12/16/15.
 */
module.factory('sessionService', function ($http) {

    var sessionService = {


        viewSessions: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: "api/sessions.json"
            }).then(function (response) {
                return response.data;
            });
        },
        addCustomer: function (data) {
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
    return sessionService;
})
;