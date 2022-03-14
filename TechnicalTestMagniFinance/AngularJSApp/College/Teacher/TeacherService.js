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

    this.updateTeacher = function (teacher) {
        var updatedRequest = $http({
            method: 'post',
            url: '/Teacher/UpdateTeacher',
            data: teacher
        });
        return updatedRequest;
    };

    this.deleteTeacher = function (teacherID) {
        return $http.post('/Teacher/DeleteTeacher/' + teacherID);
    }
});