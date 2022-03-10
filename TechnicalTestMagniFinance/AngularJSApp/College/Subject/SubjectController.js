collegeApp.controller('subjectController', function ($scope, subjectService, teacherService, courseService, studentService) {

    getSubjects();
    getStudents();

    $scope.currentCourse = '';
    $scope.currentTeacher = '';
    $scope.currentSubject = {};


    $scope.clearData = () => {
        $scope.subject = {
            Name: '',
            Fk_TeacherId: '',
            Fk_CourseId: ''
        };
    };

    $scope.loadReferences = () => {
        courseService.getAllCourses().then((res) => {
            $scope.Courses = res.data;

        });

        teacherService.getAllTeachers().then((res) => {
            $scope.Teachers = res.data;
        });
    };

    $scope.getSubjectStudents = function(subj) {
        subjectService.getSubjectStudents(subj.Id).then((res) => {
            $scope.subjectStudents = res.data;

            $scope.currentSubject = subj;
        });
    };

    $scope.setSubjectEnrollment = async function (subj) {
        $scope.currentSubject = subj;

        subjectService.getSubjectStudents(subj.Id).then((res) => {
            $scope.subjectStudents = res.data;

            const difference = $scope.Students.filter(({ Id: id1 }) => !$scope.subjectStudents.some(({ Id: id2 }) => id2 === id1));

            $scope.subjectStudents = difference;
        });

        
    };

    $scope.enrollStudent = () => {

        let gradeValue = null;
        if (typeof $scope.grade != "undefined")
            gradeValue = $scope.grade.GradeValue;

        let grade = { SubjectId: $scope.currentSubject.Id, StudentId: $scope.currentStudent.Id, GradeValue: gradeValue };

        subjectService.enrollStudent(grade).then((res) => {
            if (res.status == 200) {
                $scope.success = true;
                $scope.successMessage = "Student enrolled successfully";
            }                
        }, function () {
            $scope.error = true;
            $scope.errorMessage = 'There was an error enrolling the student.';
        });
    };

    $scope.unenrollStudent = function (StudentId) {
        let grade = { StudentId: StudentId, SubjectId: $scope.currentSubject.Id };
        subjectService.unenrollStudent(grade, $scope.currentSubject.Id).then((res) => {
            $scope.success = true;
            $scope.successMessage = "Student unenrolled successfully";
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error unenrolling the student";
        });
    };

    function getSubjects() {
        subjectService.getAllSubjects().then(function (result) {

            $scope.Subjects = result.data;
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error fetching the subjects";
        })
    };

    function getStudents() {
        studentService.getAllStudents().then(function (result) {
            $scope.Students = result.data;
        }, function (error) {
            $scope.error = true;
            $scope.errorMessage = "There was an error fetching the students";
        });
    };

    $scope.getSubject = function(Id) {
        subjectService.getSubject(Id).then(function (result) {

            $scope.currentSubject = result.data;

            $scope.Students = $scope.currentSubject.Students;
        }, function (error) {
            $scope.error = true;
            $scope.error = "There was an error fetching the subject";
        })
    };


    $scope.insertSubject = () => {
        if (!$scope.addSubjectForm.$valid) {

            alert('All fields are required!');
            return;
        }

        $scope.subject.Fk_CourseId = $scope.currentCourse.Id;
        $scope.subject.Fk_TeacherId = $scope.currentTeacher.Id;

        let subjectAdded = subjectService.insertSubject($scope.subject).then(() => {
            $scope.success = true;
            $scope.successMessage = "Subject added successfully";
            $scope.clearData();
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error adding the subject";
        });
    };

    $scope.updateScopeSubject = function (Id) {

        let subject = $scope.Subjects.find(element => element.Id == Id);

        $scope.currentCourse = subject.Cours;
        $scope.currentTeacher = subject.Teacher;

        $scope.subject = angular.copy(subject);
    };

    $scope.updateSubject = () => {

        $scope.subject.Fk_TeacherId = $scope.currentTeacher.Id;
        $scope.subject.Fk_CourseId = $scope.currentCourse.Id;


        subjectService.updateSubject($scope.subject).then(() => {
            $scope.success = true;
            $scope.successMessage = "Subject updated successfully";
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "Error updating Subject.";
        });
    };

    $scope.deleteSubject = function (Id) {
        subjectService.deleteSubject(Id).then(() => {
            $scope.success = true;
            $scope.successMessage = "Subject deleted successfully";
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "Error deleting Subject.";
        });
    };
});