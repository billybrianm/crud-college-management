collegeApp.controller('studentController', function ($, $scope, studentService, signalrService) {

    getStudents();

    signalrService.connect();

    $scope.$on('studentAdded', function (event, student) {
        student.Birthday = new Date(student.Birthday);

        student.Birthday = student.Birthday.toLocaleDateString();

        $scope.Students.push(student);
        $scope.$apply();
    });

    $scope.$on('studentUpdated', function (event, student) {
        let index = $scope.Students.findIndex(element => element.Id == student.Id);

        student.Birthday = new Date(student.Birthday);

        student.Birthday = student.Birthday.toLocaleDateString();

        $scope.Students[index] = student;

        $scope.$apply();
    });

    $scope.$on('studentDeleted', function (event, student) {
        let index = $scope.Students.findIndex(element => element.Id == student.Id);

        $scope.Students.splice(index, 1);

        $scope.$apply();
    });

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
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error fetching the students.";
        })
    };


    $scope.insertStudent = () => {

        $scope.student.Birthday = $scope.student.Birthday.toLocaleString();

        if (!$scope.addStudentForm.$valid) {

            alert('All fields are required!');
            return ;
        }

        let studentAdded = studentService.insertStudent($scope.student).then((res) => {
            $scope.success = true;
            $scope.successMessage = "Student added successfully.";
            signalrService.studentAdded(res.data);
            $scope.clearData();
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error adding the student.";
            });
        
    };

    $scope.updateScopeStudent = function (Id) {

        let student = $scope.Students.find(element => element.Id == Id);

        angular.copy(student, $scope.student);

        let parts = $scope.student.Birthday.split("/");
        $scope.student.Birthday = new Date(parts[2], parts[1] - 1, parts[0]);
    };

    $scope.updateStudent = () => {

        studentService.updateStudent($scope.student).then((res) => {
            $scope.success = true;
            $scope.successMessage = "Student updated successfully.";
            signalrService.studentUpdated(res.data);
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error updating the Student.";
        });
    };

    $scope.deleteStudent = function (Id) {
        studentService.deleteStudent(Id).then((res) => {
            $scope.success = true;
            $scope.successMessage = "Student deleted successfully";
            signalrService.studentDeleted(res.data);
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error deleting the Student.";
        });
    };
});