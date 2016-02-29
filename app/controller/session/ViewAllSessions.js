/**
 * Created by chanaka on 2/24/16.
 */
function ViewAllSessions($scope, sessionService) {

    sessionService.viewSessions().then(function (data) {
        console.log(data);
        $scope.allSessions = data.sessions;
    });

    $scope.viewDetailsModal = function (session) {
        console.log(session);
        $scope.selectedSession = session;
        $('#detailsModal').modal('show');
    }

}