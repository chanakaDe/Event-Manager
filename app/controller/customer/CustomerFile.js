/**
 * Created by chanaka on 8/27/15.
 */
function CustomerFile($scope, branchService, centerService, customerService, guaranteeService) {

    //document.getElementById("addBtn").disabled = true;
    //document.getElementById("addBtn").disabled = true;

    $scope.customerFile = {
        customerId: ""
    };
    $scope.guarantee = [{
        name: "",
        customerid: "",
        guaranteeName: ""
    }];
    $scope.customerId = "";
    $scope.guaranteeName = "";
    $scope.allGuaratee = [];
    $scope.showAdButton = true;
    $scope.customerGroup = [];

    branchService.getAllBranches().then(function (data) {
        console.log(data);
        $scope.allBranch = data;
        $('#center').prop('disabled', true);
    });

    customerService.getAllGroups().then(function (data) {
        $scope.allGroups = data;
    });

    $scope.branchClick = function () {
        $('#center').prop('disabled', false);

        $scope.allCustomer = [];
        $scope.allCenters = [];
        $scope.allGuarantees = [];
        $scope.allGuaratee = [];
        centerService.getAllCenterByBranchId($scope.customerFile.branch).then(function (data) {
            console.log(data);
            $scope.allCenters = data;
        });
    };

    $scope.centerClick = function () {
        //{
        //    groupName: '',
        //        customers: []
        //}
        //$scope.customerGroup = [];

        var createGroup = function (customers) {
        };

        customerService.customerOfCenter($scope.customerFile.center).then(function (data) {
            console.log("Center : " + $scope.customerFile.center);
            console.log(data);
            $scope.customer = data;
            $scope.allCustomer = data;

            //console.log("Customer count : " + $scope.allCustomer.length);
            //var customerCount = $scope.allCustomer.length;
            //var groupCount = customerCount / 3;
            //console.log("Group count : " + groupCount);
            //console.log("Rounded count : " + Math.round(groupCount));
            //var roundedCount = Math.round(groupCount);
            //
            //if (groupCount > roundedCount) {
            //    var realGroupCount = roundedCount + 1;
            //    $scope.groupCount = realGroupCount;
            //    console.log("Real Group Count : " + realGroupCount);
            //} else {
            //    $scope.groupCount = groupCount;
            //}
            //
            ////Creating groups dynamically.
            //for (i = 0; i < $scope.groupCount; i++) {
            //    var group = {
            //        "groupId": $scope.customerFile.center + "-" + (i + 1),
            //        "groupName": $scope.customerFile.center + "-Group" + (i + 1),
            //        "centerId": $scope.customerFile.center
            //    };
            //    $scope.customerGroup.push(group);
            //
            //    //    Saving customer group
            //    var customerGroup = {
            //        groupid: null,
            //        groupRefId: group.groupId,
            //        groupName: group.groupName,
            //        centerId: $scope.customerFile.center
            //    };
            //    console.log("customer Group");
            //    console.log(customerGroup);
            //    console.log("customer Group");
            //    customerService.saveCustomerGroup(customerGroup).then(function (data) {
            //        console.log(data);
            //    });
            //}
            //console.log($scope.customerGroup);

            if (data == '') {
                $scope.showCustomerError = true;
                $scope.showNullMessage = false;
            } else {
                $scope.showCustomerError = false;
            }
        });

        /**
         * Load all Group Has Members from server.
         */
        customerService.getAllGroupHasCustomer($scope.customerFile.center).then(function (data) {
            console.log(data);
            $scope.customerGroup1 = [];
            angular.forEach(data, function (value, key) {
                if (!$scope.customerGroup1[value.groupid]) {
                    $scope.customerGroup1[value.groupid] = [];
                }
                $scope.customerGroup1[value.groupid][key] = value;
            });
            console.log("-=-=-=-=-=-=-=-");
            console.log($scope.customerGroup1);
            $scope.$apply();
            console.log("-=-=-=-=-=-=-=-");
        });


    };

    $scope.guaranteesClick = function () {
        customerService.getAllGuarantees($scope.customerFile.center, $scope.customerId).then(function (data) {
            console.log(data);
            $scope.allGuarantees = data;
        });
        $('#myModal').modal('show');
    };

    /**
     * Add data to selected customer table.
     * @type {Array}
     */
    $scope.selectedCustomers = [];
    $scope.cloneCustomerDetails = function (data) {
        $scope.selectedCustomers.push(data);
        console.log($scope.selectedCustomers);
    };

    /**
     * Deprecated function.
     * @type {Array}
     */
    $scope.guaranteeDetails = [];
    $scope.customerClick = function (custId) {
        $scope.customerId = custId;
        console.log(custId);
        guaranteeService.getCustomerGuaranter(custId).then(function (data) {
            console.log("----------------");
            console.log(data);
            console.log("----------------");
            $scope.allGuaratee = data;
            if (data == '') {
                $scope.showNullMessage = true;
            } else {
                $scope.showNullMessage = false;
            }
            if ($scope.allGuaratee.length >= 2) {
                $scope.showAdButton = false;
            } else {
                $scope.showAdButton = true;
            }
        });
        //document.getElementById("addBtn").disabled = false;
        //document.getElementById("myDIV").style.opacity = "1";
    };

    $scope.setToGuaranteeList = function () {
        customerService.getCustomerDetail($scope.guarantee).then(function (data) {
            $scope.guaranteeName = data.name;
            var customerFile = {
                guaranteerecordid: null,
                customerid: $scope.customerId,
                guaranteeid: $scope.guarantee,
                branchid: $scope.customerFile.branch,
                centerid: $scope.customerFile.center
            };
            guaranteeService.addGuarantee(customerFile).then(function (data) {
                console.log(data);

                //    Refreshing list
                guaranteeService.getCustomerGuaranter($scope.customerId).then(function (data) {
                    console.log(data);
                    $scope.allGuaratee = data;
                    if ($scope.allGuaratee.length >= 2) {
                        $scope.showAdButton = false;
                    } else {
                        $scope.showAdButton = true;
                    }
                });

            });
        });
        $('#myModal').modal('hide');
    };

    /**
     * Remove guarantee.
     * @param id
     */
    $scope.removeGurantee = function (id) {
        console.log("NEW ID IS : " + id);

        guaranteeService.removeGuarantee(id).then(function (data) {
            console.log(data);

            //    Refreshing list
            guaranteeService.getCustomerGuaranter($scope.customerId).then(function (data) {
                console.log(data);
                $scope.allGuaratee = data;
                if ($scope.allGuaratee.length >= 2) {
                    $scope.showAdButton = false;
                } else {
                    $scope.showAdButton = true;
                }
            });
        });
    };

    /**
     * Save customer has group to the server.
     */
    $scope.saveGroupHasCustomer = function (data, i) {

        console.log(data);
        console.log(i);
        var table = document.getElementById('customerTable');
        var cell = table.rows[i + 1].cells[1];

        var e = cell.getElementsByTagName("select")[0];
        var groupId = e.options[e.selectedIndex].value;
        console.log("Value : " + groupId);

        var groupHasCustomerObj = {
            grouphasmemberid: null,
            groupid: groupId,
            memberid: data.customerid,
            addedDate: new Date()
        };
        console.log(groupHasCustomerObj);
        customerService.saveGroupHasMember(groupHasCustomerObj).then(function (data) {
            console.log(data);
        });
    };

    /**
     * Add new group seperatly.
     */
    $scope.saveNewGroup = function () {
        //    Saving customer group
        var customerGroup = {
            groupid: null,
            groupRefId: $scope.group.refId,
            groupName: $scope.group.groupName,
            centerId: $scope.customerFile.center
        };
        console.log("customer Group");
        console.log(customerGroup);
        console.log("customer Group");
        customerService.saveCustomerGroup(customerGroup).then(function (data) {
            console.log(data);
        });
    }
}