/**
 * Created by chanaka on 8/27/15.
 */
function ViewCustomer($scope, branchService, centerService, customerService, $route, settingsService) {

    //$scope.customer.custId="";
    $scope.customerid = "";
    $scope.address = "";
    $scope.branch = "";
    $scope.nic = "";
    $scope.name = "";
    $scope.initials = "";
    $scope.gender = "";
    $scope.dob = "";
    $scope.province = "";
    $scope.businessType = "";
    $scope.address = "";
    $scope.city = "";
    $scope.civilStatus = "";
    $scope.tpNo = "";
    $scope.customerid = "";
    $scope.center = "";
    $('#center').prop('disabled', true);

    customerService.getAllCustomerByPagination().then(function (data) {
        console.log(data);
        $scope.allCustomer = data;
    });

    branchService.getAllBranches().then(function (data) {
        console.log(data);
        $scope.allBranch = data;
    });
    $scope.getCentersForUpdate = function () {
        centerService.getAllCenterByBranchId($scope.branch).then(function (data) {
            console.log(data);
            $scope.allCenters = data;
        });

    };

    $scope.branchClick = function () {

        centerService.getAllCenterByBranchId($scope.customerFile.branch).then(function (data) {
            console.log(data);
            $scope.allCenters = data;
        });
        $('#center').prop('disabled', false);
    };

    $scope.getCustomerCode = function () {
        customerService.getCustomerCodeFormServer($scope.center).then(function (data) {
            console.log(data);
            $scope.custId = data.id;
        });
    };
    $scope.updateCustomer = function (data) {

        console.log(data);

        $scope.custId = data.code;
        $scope.address = data.address;
        $scope.branch = data.branchid;
        $scope.nic = data.nic;
        $scope.name = data.name;
        $scope.initials = data.initials;
        $scope.gender = data.gender;
        $scope.dobOfUpdate = data.dob;
        $scope.province = data.province;
        $scope.businessType = data.businesstypeid;
        $scope.city = data.city;
        $scope.civilStatus = data.civilStatus;
        $scope.tpNo = data.tpNo;
        $scope.customerid = data.customerid;

        centerService.getAllCenterByBranchId($scope.branch).then(function (data1) {
            console.log(data1);
            $scope.allCenters = data1;
            $scope.center = data.centerid;
        });
        $('#myModal').modal('show');

    };

    $scope.updateCustomerButton = function () {
        var customerUpdate = {
            customerid: $scope.customerid,
            "code": $scope.custId,
            address: $scope.address,
            branchid: $scope.branch,
            dob: $scope.dobOfUpdate,
            businesstypeid: $scope.businessType,
            centerid: $scope.center,
            city: $scope.city,
            civilStatus: $scope.civilStatus,
            gender: $scope.gender,
            initials: $scope.initials,
            name: $scope.name,
            nic: $scope.nic,
            province: $scope.province,
            tpNo: $scope.tpNo
        };

        customerService.editCustomerNow(customerUpdate).then(function (data) {
            console.log(data);
            $.notify("Customer Edit Successful", "success");
            $route.reload();
            $('#myModal').modal('hide');
        });
    };

    $scope.centerClick = function () {

        centerService.getAllCenterByBranchId($scope.customerFile.branch).then(function (data) {
            console.log(data);
            $scope.allCenters = data;
        });
        $('#center').prop('disabled', false);
    };

    $scope.centerClick = function () {
        customerService.customerOfCenter($scope.customerFile.center).then(function (data) {
            console.log(data);
            $scope.allCustomer = data;
        });

    };

    settingsService.getAllBusiness().then(function (data) {
        console.log(data);
        $scope.allBusiness = data;
    });
}