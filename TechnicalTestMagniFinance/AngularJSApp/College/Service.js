collegeApp.service('studentService', function ($http) {

    this.getAllStudents = function () {
        return $http.get("/Student/GetStudents")
    }

    this.insertStudent = function (student) {
        let request = $http({
            method: 'post',
            url: '/Student/InsertStudent',
            data: student

        });

        return request;
    }
});