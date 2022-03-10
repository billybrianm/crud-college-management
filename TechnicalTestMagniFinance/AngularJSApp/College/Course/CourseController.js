collegeApp.controller('courseController', function ($scope, courseService) {

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

        let courseAdded = courseService.insertCourse($scope.course).then(() => {
            $scope.success = true;
            $scope.successMessage = "Course inserted successfully.";
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

        courseService.updateCourse($scope.course).then(() => {
            $scope.success = true;
            $scope.successMessage = "Course update successfully.";
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error updating the course.";
        });
    };

    $scope.deleteCourse = function (Id) {
        courseService.deleteCourse(Id).then(() => {
            $scope.success = true;
            $scope.successMessage = "Course deleted successfully.";
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error deleting the course.";
        });
    };
});