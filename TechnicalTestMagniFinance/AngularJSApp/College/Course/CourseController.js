collegeApp.controller('courseController', function ($scope, courseService, signalrService) {

    signalrService.connect();

    $scope.$on('courseAdded', function (event, course) {
        $scope.Courses.push(course);
        $scope.$apply();
    });

    $scope.$on('courseUpdated', function (event, course) {
        let index = $scope.Courses.findIndex(element => element.Id == course.Id);

        $scope.Courses[index] = course;
        $scope.$apply();
    });

    $scope.$on('courseDeleted', function (event, course) {
        let index = $scope.Courses.findIndex(element => element.Id == course.Id);

        $scope.Courses.splice(index, 1);

        $scope.$apply();
    });

    getCourses();


    $scope.course = {
        Name: '',
    };


    $scope.clearData = () => {
        $scope.course = {
            Name: '',
        };
    };

    function getCourses() {
        courseService.getAllCourses().then(function (result) {

            $scope.Courses = result.data;
        }, function (error) {
            $scope.error = true;
            $scope.errorMessage = "There was an error fetching the courses";
        })
    };


    $scope.insertCourse = () => {

        if (!$scope.addCourseForm.$valid) {
            alert('All fields are required!');
            return;
        }

        let courseAdded = courseService.insertCourse($scope.course).then((res) => {
            $scope.success = true;
            $scope.successMessage = "Course inserted successfully.";
            signalrService.courseAdded(res.data);
            $scope.clearData();
        }, function (error) {
            $scope.error = true;
            $scope.errorMessage = "There was an error adding the course.";
        });
    };

    $scope.updateScopeCourse = function (Id) {

        let course = $scope.Courses.find(element => element.Id == Id);

        angular.copy(course, $scope.course);
    };

    $scope.updateCourse = () => {

        courseService.updateCourse($scope.course).then((res) => {
            $scope.success = true;
            $scope.successMessage = "Course update successfully.";
            signalrService.courseUpdated(res.data);
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error updating the course.";
        });
    };

    $scope.deleteCourse = function (Id) {
        courseService.deleteCourse(Id).then((res) => {
            $scope.success = true;
            $scope.successMessage = "Course deleted successfully.";
            signalrService.courseDeleted(res.data);
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error deleting the course.";
        });
    };
});