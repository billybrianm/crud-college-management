collegeApp.service('teacherService', function ($http) {

    this.getAllTeachers = () => {
        return $http.get("/Teacher/GetTeachers")
    }

    this.insertTeacher = function (teacher) {
        let request = $http({
            method: 'post',
            url: '/Teacher/InsertTeacher',
            data: teacher

        });

        return request;
    }
});