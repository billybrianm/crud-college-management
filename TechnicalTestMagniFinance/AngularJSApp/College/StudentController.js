collegeApp.controller('studentController', function ($scope, studentService) {

    getStudents();


    $scope.student = {
        Name: '',
        Birthday: '',
        Reg_number: ''
    };


    $scope.clearData = () => {
        $scope.student = {
            Name: '',
            Birthday: '',
            Reg_number: ''
        };
    };

    function getStudents() {
        studentService.getAllStudents().then(function (result) {

            // convert JSON Date to DD/MM/YYYY for all students
            result.data.forEach(function (element) {
                if (element.Birthday != null) {
                    element.Birthday = new Date(parseInt(element.Birthday.replace('/Date(', '')));

                    element.Birthday = element.Birthday.toLocaleDateString();
                }
            });

            $scope.Students = result.data;
        }, function (error) {
            console.log(error);
            alert("There was an error fetching the students.");
        })
    };


    $scope.insertStudent = () => {

        $scope.student.Birthday = $scope.student.Birthday.toLocaleString();

        if (!$scope.addStudentForm.$valid) {

            alert('All fields are required!');
            return ;
        }

        let studentAdded = studentService.insertStudent($scope.student).then(() => {
            alert('Student added successfully.');
            $scope.clearData();
        }, function (error) {
            alert('There was an error adding the student.');
        });
    };

    $scope.updateScopeStudent = function (Id) {

        let student = $scope.Students.find(element => element.Id == Id);

        angular.copy(student, $scope.student);

        let parts = $scope.student.Birthday.split("/");
        $scope.student.Birthday = new Date(parts[2], parts[1] - 1, parts[0]);
    };

    $scope.updateStudent = () => {

        studentService.updateStudent($scope.student).then(() => {
            alert('Student updated successfully.');
        });
    };

    $scope.deleteStudent = function (Id) {
        studentService.deleteStudent(Id).then(() => {
            alert('Student deleted successfully.');
        });
    };
});