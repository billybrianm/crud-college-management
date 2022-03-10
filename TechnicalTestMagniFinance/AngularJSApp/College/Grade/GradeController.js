collegeApp.controller('gradeController', function ($scope, gradeService, subjectService, studentService, signalrService) {

    signalrService.connect();

    getGrades();

    $scope.$on('gradeAdded', function (event, grade) {

        $scope.Grades.push(grade);
        $scope.$apply();
    });

    $scope.currentSubject = '';
    $scope.currentStudent = '';

    $scope.grade = {
        GradeValue: '',
    };


    $scope.clearData = () => {
        $scope.grade = {
            Name: '',

        };
    };

    $scope.loadReferences = () => {
        subjectService.getAllSubjects().then((res) => {
            $scope.Subjects = res.data;

        });

        studentService.getAllStudents().then((res) => {
            $scope.Students = res.data;
        });
    };    

    function getGrades() {
        gradeService.getAllGrades().then(function (result) {

            $scope.Grades = result.data;
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error fetching the grades";
        })
    };



    $scope.insertGrade = () => {
        if (!$scope.addGradeForm.$valid) {

            alert('All fields are required!');
            return;
        }

        $scope.grade.StudentId = $scope.currentStudent.Id;
        $scope.grade.SubjectId = $scope.currentSubject.Id;

        let gradeAdded = gradeService.insertGrade($scope.grade).then((res) => {
            $scope.success = true;
            $scope.successMessage = "Grade added successfully";
            signalrService.gradeAdded(res.data);
            $scope.clearData();
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error adding the grade";
        });
    };

    $scope.updateScopeGrade = function (Id) {

        let grade = $scope.Grades.find(element => element.Id == Id);

        $scope.currentCourse = grade.Cours;
        $scope.currentTeacher = grade.Teacher;

        $scope.grade = angular.copy(grade);
    };

    $scope.updateGrade = () => {

        $scope.grade.Fk_TeacherId = $scope.currentTeacher.Id;
        $scope.grade.Fk_CourseId = $scope.currentCourse.Id;


        gradeService.updateGrade($scope.grade).then((res) => {
            $scope.success = true;
            $scope.successMessage = "Grade updated successfully";
            signalrService.gradeUpdated(res.data);
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error updating the grade.";
        });
    };

    $scope.deleteGrade = function (Id) {
        gradeService.deleteGrade(Id).then((res) => {
            $scope.success = true;
            $scope.successMessage = "Grade deleted successfully";
            signalrService.gradeDeleted(res.data);
        }, function () {
            $scope.error = true;
            $scope.errorMessage = "There was an error deleting the grade."
        });
    };
});