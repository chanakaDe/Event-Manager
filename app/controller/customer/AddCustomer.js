/**
 * Created by chanaka on 8/27/15.
 */
function AddCustomer($scope, branchService, centerService, customerService, $route, settingsService) {

    /**
     * Assigning and initializing objects and variables.
     * @type {{address: string, branch: string, businesstypeid: string, center: string, city: string, civilStatus: string, gender: string, id: string, initials: string, name: string, nic: string, province: string, tpNo: string}}
     */
    $scope.customer = {
        address: "",
        branch: "",
        businesstypeid: "",
        center: "",
        city: "",
        civilStatus: "",
        gender: "",
        id: "",
        initials: "",
        name: "",
        nic: "",
        province: "",
        tpNo: ""
    };
    $scope.errors = [];
    $scope.generateValue = false;
    $scope.allCenters = [];
    $scope.allBranch = [];

    /**
     * get all braches.
     */
    branchService.getAllBranches().then(function (data) {
        console.log(data);
        $scope.allBranch = data;
    });

    settingsService.getAllBusiness().then(function (data) {
        console.log(data);
        $scope.allBusiness = data;
    });

    //centerService.getAllCenter().then(function (data) {
    //    console.log(data);
    //    console.log('view all center :' + data);
    //    $scope.allCenters = data;
    //});
    /**
     * Save new customer.
     */
    $scope.addNewCustomer = function () {
        if ($scope.customer.id == '') {
            $scope.errors.push("Error");
            document.getElementById("id").style.backgroundColor = "#FFB2B2";
        } else {
            document.getElementById("id").style.backgroundColor = "white";
        }
        if ($scope.customer.initials == '') {
            $scope.errors.push("Error");
            document.getElementById("initials").style.backgroundColor = "#FFB2B2";
        } else {
            document.getElementById("initials").style.backgroundColor = "white";
        }
        if ($scope.customer.nic == '') {
            $scope.errors.push("Error");
            document.getElementById("nic").style.backgroundColor = "#FFB2B2";
        } else {
            document.getElementById("nic").style.backgroundColor = "white";
        }

        if ($scope.customer.branch == '') {
            $scope.errors.push("Error");
            document.getElementById("branch").style.backgroundColor = "#FFB2B2";
        } else {
            document.getElementById("branch").style.backgroundColor = "white";
        }

        if ($scope.customer.center == '') {
            $scope.errors.push("Error");
            document.getElementById("center").style.backgroundColor = "#FFB2B2";
        } else {
            document.getElementById("center").style.backgroundColor = "white";
        }

        if ($scope.customer.name == '') {
            $scope.errors.push("Error");
            document.getElementById("name").style.backgroundColor = "#FFB2B2";
        } else {
            document.getElementById("name").style.backgroundColor = "white";
        }

        if ($scope.customer.civilStatus == '') {
            $scope.errors.push("Error");
            document.getElementById("civilStatus").style.backgroundColor = "#FFB2B2";
        } else {
            document.getElementById("civilStatus").style.backgroundColor = "white";
        }

        if ($scope.customer.address == '') {
            $scope.errors.push("Error");
            document.getElementById("address").style.backgroundColor = "#FFB2B2";
        } else {
            document.getElementById("address").style.backgroundColor = "white";
        }

        if ($scope.customer.city == '') {
            $scope.errors.push("Error");
            document.getElementById("city").style.backgroundColor = "#FFB2B2";
        } else {
            document.getElementById("city").style.backgroundColor = "white";
        }

        if ($scope.errors.length > 0) {
            document.getElementById('topNav').scrollIntoView();
            $scope.errors = [];
            return;
        }

        var customer = {
            customerid: null,
            "code": $scope.customer.id,
            address: $scope.customer.address,
            branchid: $scope.customer.branch,
            dob: $scope.customer.dob,
            businesstypeid: $scope.customer.businesstypeid,
            centerid: $scope.customer.center,
            city: $scope.customer.city,
            civilStatus: $scope.customer.civilStatus,
            gender: $scope.customer.gender,
            initials: $scope.customer.initials,
            name: $scope.customer.name,
            nic: $scope.customer.nic,
            province: $scope.customer.province,
            tpNo: $scope.customer.tpNo
        }

        customerService.addCustomer(customer).then(function (data) {
            console.log(data);
            $.notify("Customer Added Successfully", "success");
            $route.reload();
        });


    };

    /**
     * Get checkbox value for auto generate nic.
     */
    $scope.getCheckBoxValue = function () {
        if (debug) {
            console.log($scope.generateValue);
        }
        if ($scope.generateValue == false) {

        }
    }

    $scope.getCenters = function () {
        centerService.getAllCenterByBranchId($scope.customer.branch).then(function (data) {
            console.log(data);
            $scope.allCenters = data;
        });

    }

    $scope.getCustomerCode = function () {
        customerService.getCustomerCodeFormServer($scope.customer.center).then(function (data) {
            console.log(data);
            $scope.customer.id = data.id;
        });

    }


}