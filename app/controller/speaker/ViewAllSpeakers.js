/**
 * Created by chanaka on 2/25/16.
 */
function ViewAllSpeakers($scope, speakerService) {

    speakerService.viewSpeakers().then(function (data) {
        $scope.allSpeakers = data.speakers;
        console.log($scope.allSpeakers);
    });

}