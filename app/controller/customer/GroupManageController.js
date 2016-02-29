/**
 * Created by chanaka on 10/6/15.
 */
function GroupManageController($scope, branchService, centerService) {

    branchService.getAllBranches().then(function (data) {
        console.log(data);
        $scope.allBranch = data;
        $('#center').prop('disabled', true);
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
}