/**
 * Created by chanaka on 8/13/15.
 */
module.factory('customerService', function ($http) {

    var customerService = {
        viewCustomers: function () {

            return $http({
                method: "GET",
                headers: headers,
                url: host.adinfo + '/sortByPromoteStatus?status='
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
        },
        getAllCustomer: function () {
            return $http({
                method: "GET",
                headers: headers,
                url: host.customer + '/getAll'
            }).then(function (response) {
                return response.data;
            });
        }
        ,
        getAllCustomerByPagination: function (limit, offset) {
            return $http({
                method: "GET",
                headers: headers,
                url: host.customer + '/getAllCustomersByPagination?limit=10&offset=0'
            }).then(function (response) {
                return response.data;
            });
        }
        ,
        getCustomerCodeFormServer: function (data) {
            return $http({
                method: "GET",
                headers: headers,
                url: host.customer + '/getId?centerId=' + data
            }).then(function (response) {
                return response.data;
            });
        }
        ,
        editCustomerNow: function (data) {
            return $http({
                method: "POST",
                data: data,
                headers: headers,
                url: host.customer + '/update'
            }).then(function (reponse) {
                return reponse.data;
            });
        }
        ,
        customerOfCenter: function (data) {
            return $http({
                method: "GET",
                headers: headers,
                url: host.customer + '/getAllCustomersByCenterId?centerId=' + data + '&limit=10&offset=0'
            }).then(function (response) {
                return response.data;
            });
        }
        ,
        guaranteesOfCustomer: function (data) {
            return $http({
                method: "GET",
                headers: headers,
                url: host.customer + '/'
            }).then(function (response) {
                return response.data;
            });
        }
        ,
        getAllGuarantees: function (centerId, customerId) {
            return $http({
                method: "GET",
                headers: headers,
                url: host.customer + '/selectGuarantee?centerId=' + centerId + '&customerId=' + customerId + '&limit=100&offset=0'
            }).then(function (response) {
                return response.data;
            });
        }
        ,
        getCustomerDetail: function (guarId) {
            return $http({
                method: "GET",
                headers: headers,
                url: host.customer + '/getDetailsById?customerId=' + guarId
            }).then(function (response) {
                return response.data;
            });
        },
        /**
         * Save customer group.
         * @param data
         * @returns {*}
         */
        saveCustomerGroup: function (data) {
            return $http({
                method: "POST",
                headers: headers,
                data: data,
                url: host.group + '/save'
            }).then(function (response) {
                return response.data;
            });
        },
        /**
         * Save Group Has Member
         * @param data
         * @returns {*}
         */
        saveGroupHasMember: function (data) {
            return $http({
                method: "POST",
                headers: headers,
                data: data,
                url: host.grouphasmember + '/save'
            }).then(function (response) {
                return response.data;
            });
        },
        /**
         * Load customers with center id.
         * @param centerId
         * @returns {*}
         */
        getAllGroupHasCustomer: function (centerId) {
            return $http({
                method: "GET",
                headers: headers,
                url: host.group + '/getGroupMembersByCenterId?centerId=' + centerId
            }).then(function (response) {
                return response.data;
            });
        },
        /**
         * Get all groups.
         * @returns {*}
         */
        getAllGroups: function () {
            return $http({
                method: "GET",
                headers: headers,
                url: host.group + '/getAll'
            }).then(function (response) {
                return response.data;
            });
        }
    };
    return customerService;
})
;