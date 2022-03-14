collegeApp.service('studentService', function ($http) {

    this.getAllStudents = () => {
        return $http.get("/Student/GetStudents")
    };

    this.getStudentGrades = function (ID) {
        return $http.get("/Student/GetStudentGrades/" + ID);
    };

    this.insertStudent = function (student) {
        let request = $http({
            method: 'post',
            url: '/Student/InsertStudent',
            data: student

        });

        return request;
    };

    this.updateStudent = function (student) {
        var updatedRequest = $http({
            method: 'post',
            url: '/Student/UpdateStudent',
            data: student
        });
        return updatedRequest;
    };

    this.deleteStudent = function (studentID) {
        return $http.post('/Student/DeleteStudent/' + studentID);
    };
});