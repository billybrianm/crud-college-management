collegeApp.controller('homeController', function ($scope, courseService, subjectService, studentService) {

    $scope.Courses = {};
    $scope.Subjects = {};
    $scope.Students = {};



    getCourseInfos();
    function getCourseInfos() {
        courseService.getListCourseInfos().then((res) => {
            $scope.Courses = res.data;
        });
    };

    getSubjectInfos();
    function getSubjectInfos() {
        subjectService.getListSubjectInfos().then((res) => {
            $scope.Subjects = res.data;
        });
    };

    getStudents();
    function getStudents() {
        studentService.getAllStudents().then((res) => {
            $scope.Students = res.data;
        });
    };

    $scope.teacherInfos = function (sub) {

        sub.TeacherBirthday = new Date(parseInt(sub.TeacherBirthday.replace('/Date(', '')));

        sub.TeacherBirthday = sub.TeacherBirthday.toLocaleDateString();

        let parts = sub.TeacherBirthday.split("/");
        sub.TeacherBirthday = new Date(parts[2], parts[1] - 1, parts[0]);

        $scope.teacher = sub;
    };

    $scope.subjectStudentGrades = function (Id) {
        subjectService.getSubjectStudents(Id).then((res) => {
            $scope.subjectStudents = res.data;
        });
    };

    $scope.studentGrades = function (stud) {
        studentService.getStudentGrades(stud.Id).then((res) => {
            $scope.student = res.data;
            $scope.student.Name = stud.Name;
        });

    };

});