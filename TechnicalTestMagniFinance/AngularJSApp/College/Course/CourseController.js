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
            alert("There was an error fetching the courses." + error);
        })
    };


    $scope.insertCourse = () => {

        if (!$scope.addCourseForm.$valid) {
            alert('All fields are required!');
            return;
        }

        let courseAdded = courseService.insertCourse($scope.course).then(() => {
            alert('Course added successfully.');
            $scope.clearData();
        }, function (error) {
            alert('There was an error adding the course.');
        });
    };

    $scope.updateScopeCourse = function (Id) {

        let course = $scope.Courses.find(element => element.Id == Id);

        angular.copy(course, $scope.course);
    };

    $scope.updateCourse = () => {

        courseService.updateCourse($scope.course).then(() => {
            alert('Course updated successfully.');
        });
    };

    $scope.deleteCourse = function (Id) {
        courseService.deleteCourse(Id).then(() => {
            alert('Course deleted successfully.');
        });
    };
});