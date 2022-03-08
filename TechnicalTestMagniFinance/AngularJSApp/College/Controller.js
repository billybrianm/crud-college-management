collegeApp.controller('studentController', function ($scope, studentService) {

    getStudents();


    function getStudents() {
        var listStudents = studentService.getAllStudents().then(function (result) {

            // convert JSON Date to DD/MM/YYYY for all students
            result.data.forEach(function (element) {
                element.Birthday = new Date(parseInt(element.Birthday.replace('/Date(', '')));

                element.Birthday = element.Birthday.toLocaleDateString();            
            });

            $scope.Students = result.data;
        }, function () {
            alert("There was an error fetching the students.");
        })
    }
});