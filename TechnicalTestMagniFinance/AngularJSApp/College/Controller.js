collegeApp.controller('studentController', function ($scope, studentService) {

    getStudents();

    function getStudents() {
        var listStudents = studentService.getAllStudents().then(function (result) {
            $scope.Students = result.data;
        }, function () {
            alert("There was an error fetching the students.");
        })
    }
});