collegeApp.controller('studentController', function ($scope, studentService) {

    getStudents();

    $scope.student = {
        Name: 'Aurelio Santos',
        Birthday: '1998-11-22 00:00:00',
        Reg_number: '789'
    };


    function getStudents() {
        let listStudents = studentService.getAllStudents().then(function (result) {

            // convert JSON Date to DD/MM/YYYY for all students
            result.data.forEach(function (element) {
                element.Birthday = new Date(parseInt(element.Birthday.replace('/Date(', '')));

                element.Birthday = element.Birthday.toLocaleDateString();            
            });

            $scope.Students = result.data;
        }, function (error) {
            console.log(error);
            alert("There was an error fetching the students." + error);
        })
    };


    $scope.insertStudent = function () {
        let studentAdded = studentService.insertStudent($scope.student).then(() => {
            console.log("ADDED " + studentAdded);
        });
    };
});