collegeApp.controller('teacherController', function ($scope, teacherService) {

    getTeachers();

    $scope.teacher = {
        Name: '',
        Birthday: '',
        Salary: ''
    };

    $scope.clearData = () => {
        $scope.teacher = {
            Name: '',
            Birthday: '',
            Salary: ''
        };
    };


    function getTeachers() {
        teacherService.getAllTeachers().then(function (result) {

            // convert JSON Date to DD/MM/YYYY for all teachers
            result.data.forEach(function (element) {
                if (element.Birthday != null) {
                    element.Birthday = new Date(parseInt(element.Birthday.replace('/Date(', '')));

                    element.Birthday = element.Birthday.toLocaleDateString();
                }
            });

            $scope.Teachers = result.data;
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error fetching the teachers.";
        })
    };


    $scope.insertTeacher = () => {

        $scope.teacher.Birthday = $scope.teacher.Birthday.toLocaleString();

        if (!$scope.addTeacherForm.$valid) {
            addTeacher.style.display = 'block';

            alert('All fields are required!');
            return;
        }

        teacherService.insertTeacher($scope.teacher).then(() => {
            $scope.success = true;
            $scope.successMessage = "Teacher added successfully";
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error adding the teacher.";
        });
    };

    $scope.updateScopeTeacher = function (Id) {

        let teacher = $scope.Teachers.find(element => element.Id == Id);

        angular.copy(teacher, $scope.teacher);

        let parts = $scope.teacher.Birthday.split("/");
        $scope.teacher.Birthday = new Date(parts[2], parts[1] - 1, parts[0]);
    };

    $scope.updateTeacher = () => {

        teacherService.updateTeacher($scope.teacher).then(() => {
            $scope.success = true;
            $scope.successMessage = "Teacher updated successfully";
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error updating the teacher.";
        });
    };

    $scope.deleteTeacher = function (Id) {
        teacherService.deleteTeacher(Id).then(() => {
            $scope.success = true;
            $scope.successMessage = "Teacher deleted successfully.";
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error deleting the teacher.";
        });
    };
});