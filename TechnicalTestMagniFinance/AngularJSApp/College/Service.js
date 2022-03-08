collegeApp.service('studentService', function ($http) {

    this.getAllStudents = function () {
        return $http.get("/Student/GetStudents")
    }
});