collegeApp.controller('teacherController', function ($scope, teacherService, signalrService) {

    signalrService.connect();

    getTeachers();

    $scope.$on('teacherAdded', function (event, teacher) {
        teacher.Birthday = new Date(teacher.Birthday);

        teacher.Birthday = teacher.Birthday.toLocaleDateString();

        $scope.Teachers.push(teacher);
        $scope.$apply();
    });

    $scope.$on('teacherUpdated', function (event, teacher) {
        let index = $scope.Teachers.findIndex(element => element.ID == teacher.ID);

        teacher.Birthday = new Date(teacher.Birthday);

        teacher.Birthday = teacher.Birthday.toLocaleDateString();

        $scope.Teachers[index] = teacher;

        $scope.$apply();
    });

    $scope.$on('teacherDeleted', function (event, teacher) {
        let index = $scope.Teachers.findIndex(element => element.ID == teacher.ID);

        $scope.Teachers.splice(index, 1);

        $scope.$apply();
    });

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

        if (!$scope.addTeacherForm.$valID) {
            addTeacher.style.display = 'block';

            alert('All fields are required!');
            return;
        }

        teacherService.insertTeacher($scope.teacher).then((res) => {
            $scope.success = true;
            $scope.successMessage = "Teacher added successfully";
            signalrService.teacherAdded(res.data);
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error adding the teacher.";
        });
    };

    $scope.updateScopeTeacher = function (ID) {

        let teacher = $scope.Teachers.find(element => element.ID == ID);

        angular.copy(teacher, $scope.teacher);

        let parts = $scope.teacher.Birthday.split("/");
        $scope.teacher.Birthday = new Date(parts[2], parts[1] - 1, parts[0]);
    };

    $scope.updateTeacher = () => {

        teacherService.updateTeacher($scope.teacher).then((res) => {
            $scope.success = true;
            $scope.successMessage = "Teacher updated successfully";
            signalrService.teacherUpdated(res.data);
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error updating the teacher.";
        });
    };

    $scope.deleteTeacher = function (ID) {
        teacherService.deleteTeacher(ID).then((res) => {
            $scope.success = true;
            $scope.successMessage = "Teacher deleted successfully.";
            signalrService.teacherDeleted(res.data);
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error deleting the teacher.";
        });
    };
});