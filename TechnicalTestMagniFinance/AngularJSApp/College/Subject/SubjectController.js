collegeApp.controller('subjectController', function ($scope, subjectService, teacherService, courseService, studentService, signalrService) {

    signalrService.connect();

    getSubjects();
    getStudents();

    $scope.currentCourse = '';
    $scope.currentTeacher = '';
    $scope.currentSubject = {};



    $scope.$on('subjectAdded', function (event, subject) {

        $scope.Subjects.push(subject);
        $scope.$apply();
    });

    $scope.$on('subjectUpdated', function (event, subject) {
        let index = $scope.Subjects.findIndex(element => element.ID == subject.ID);

        $scope.Subjects[index] = subject;

        $scope.$apply();
    });

    $scope.$on('subjectDeleted', function (event, subject) {
        let index = $scope.Subjects.findIndex(element => element.ID == subject.ID);

        $scope.Subjects.splice(index, 1);

        $scope.$apply();
    });

    $scope.$on('gradeAdded', function (event, grade) {

        $scope.subjectStudents.push(grade);
        $scope.$apply();
    });

    $scope.$on('gradeDeleted', function (event, grade) {
        let index = $scope.subjectStudents.findIndex(element => element.StudentID == grade.StudentID);

        $scope.subjectStudents.splice(index, 1);

        $scope.$apply();
    });

    $scope.clearData = () => {
        $scope.subject = {
            Name: '',
            Fk_TeacherID: '',
            Fk_CourseID: ''
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
        subjectService.getSubjectStudents(subj.ID).then((res) => {
            $scope.subjectStudents = res.data;

            $scope.currentSubject = subj;
        });
    };

    $scope.setSubjectEnrollment = async function (subj) {
        $scope.currentSubject = subj;

        subjectService.getSubjectStudents(subj.ID).then((res) => {
            $scope.subjectStudents = res.data;

            const difference = $scope.Students.filter(({ ID: ID1 }) => !$scope.subjectStudents.some(({ ID: ID2 }) => ID2 === ID1));

            $scope.subjectStudents = difference;
        });

        
    };

    $scope.enrollStudent = () => {

        let gradeValue = null;
        if (typeof $scope.grade != "undefined")
            gradeValue = $scope.grade.GradeValue;

        let grade = { SubjectID: $scope.currentSubject.ID, StudentID: $scope.currentStudent.ID, GradeValue: gradeValue };

        subjectService.enrollStudent(grade).then((res) => {
            if (res.status == 200) {
                $scope.success = true;
                $scope.successMessage = "Student enrolled successfully";
                signalrService.gradeAdded(res.data);
            }                
        }, function () {
            $scope.error = true;
            $scope.errorMessage = 'There was an error enrolling the student.';
        });
    };

    $scope.unenrollStudent = function (StudentID) {
        let grade = { StudentID: StudentID, SubjectID: $scope.currentSubject.ID };
        subjectService.unenrollStudent(grade, $scope.currentSubject.ID).then((res) => {
            $scope.success = true;
            $scope.successMessage = "Student unenrolled successfully";
            signalrService.gradeDeleted(res.data);
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

    $scope.getSubject = function(ID) {
        subjectService.getSubject(ID).then(function (result) {

            $scope.currentSubject = result.data;

            $scope.Students = $scope.currentSubject.Students;
        }, function (error) {
            $scope.error = true;
            $scope.error = "There was an error fetching the subject";
        })
    };


    $scope.insertSubject = () => {
        if (!$scope.addSubjectForm.$valID) {

            alert('All fields are required!');
            return;
        }

        $scope.subject.Fk_CourseID = $scope.currentCourse.ID;
        $scope.subject.Fk_TeacherID = $scope.currentTeacher.ID;

        let subjectAdded = subjectService.insertSubject($scope.subject).then((res) => {
            $scope.success = true;
            $scope.successMessage = "Subject added successfully";
            signalrService.subjectAdded(res.data);
            $scope.clearData();
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error adding the subject";
        });
    };

    $scope.updateScopeSubject = function (ID) {

        let subject = $scope.Subjects.find(element => element.ID == ID);

        $scope.currentCourse = subject.Cours;
        $scope.currentTeacher = subject.Teacher;

        $scope.subject = angular.copy(subject);
    };

    $scope.updateSubject = () => {

        $scope.subject.Fk_TeacherID = $scope.currentTeacher.ID;
        $scope.subject.Fk_CourseID = $scope.currentCourse.ID;


        subjectService.updateSubject($scope.subject).then((res) => {
            $scope.success = true;
            $scope.successMessage = "Subject updated successfully";
            signalrService.subjectUpdated(res.data);
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "Error updating Subject.";
        });
    };

    $scope.deleteSubject = function (ID) {
        subjectService.deleteSubject(ID).then((res) => {
            $scope.success = true;
            $scope.successMessage = "Subject deleted successfully";
            signalrService.subjectDeleted(res.data);
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "Error deleting Subject.";
        });
    };
});