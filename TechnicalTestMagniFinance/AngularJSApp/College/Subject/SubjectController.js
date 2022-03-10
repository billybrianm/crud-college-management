collegeApp.controller('subjectController', function ($scope, subjectService, teacherService, courseService, studentService) {

    getSubjects();
    getStudents();

    $scope.currentCourse = '';
    $scope.currentTeacher = '';
    $scope.currentSubject = {};


    $scope.clearData = () => {
        $scope.subject = {
            Name: '',
            
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
            if(res.status == 200)
                alert('Student enrolled successfully.');
        }, function (error) {
            console.log(error);
            alert('There was an error enrolling the student.' + error.statusText);
        });
    };

    $scope.unenrollStudent = function (StudentId) {
        let grade = { StudentId: StudentId, SubjectId: $scope.currentSubject.Id };
        subjectService.unenrollStudent(grade, $scope.currentSubject.Id).then((res) => {
            alert('Student unenrolled successfully.');
        }, function (error) {
            alert('There was an error unenrolling the student.' + error.statusText);
        });
    };

    function getSubjects() {
        subjectService.getAllSubjects().then(function (result) {

            $scope.Subjects = result.data;
        }, function (error) {
            alert("There was an error fetching the subjects." + error.statusText);
        })
    };

    function getStudents() {
        studentService.getAllStudents().then(function (result) {
            $scope.Students = result.data;
        }, function (error) {
            alert("There was an error fetching the students." + error.statusText);
        });
    };

    $scope.getSubject = function(Id) {
        subjectService.getSubject(Id).then(function (result) {

            $scope.currentSubject = result.data;

            $scope.Students = $scope.currentSubject.Students;
        }, function (error) {
            alert("There was an error fetching the subject." + error);
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
            alert('Subject added successfully.');
            $scope.clearData();
        }, function (error) {
            alert('There was an error adding the subject.');
        });
    };

    $scope.updateScopeSubject = function (Id) {

        let subject = $scope.Subjects.find(element => element.Id == Id);

        $scope.currentCourse = subject.Cours;
        $scope.currentTeacher = subject.Teacher;

        angular.copy(subject, $scope.subject);
    };

    $scope.updateSubject = () => {

        $scope.subject.Fk_TeacherId = $scope.currentTeacher.Id;
        $scope.subject.Fk_CourseId = $scope.currentCourse.Id;


        subjectService.updateSubject($scope.subject).then(() => {
            alert('Subject updated successfully.');
        });
    };

    $scope.deleteSubject = function (Id) {
        subjectService.deleteSubject(Id).then(() => {
            alert('Subject deleted successfully.');
        });
    };
});