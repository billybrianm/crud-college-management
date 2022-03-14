collegeApp.service('courseService', function ($http) {

    this.getAllCourses = () => {
        return $http.get("/Course/GetCourses")
    };

    this.getListCourseInfos = () => {
        return $http.get("/Course/GetListCourseInfos");
    };

    this.insertCourse = function (Course) {
        let request = $http({
            method: 'post',
            url: '/Course/InsertCourse',
            data: Course

        });

        return request;
    };

    this.updateCourse = function (Course) {
        var updatedRequest = $http({
            method: 'post',
            url: '/Course/UpdateCourse',
            data: Course
        });
        return updatedRequest;
    };

    this.deleteCourse = function (CourseID) {
        return $http.post('/Course/DeleteCourse/' + CourseID);
    };
});