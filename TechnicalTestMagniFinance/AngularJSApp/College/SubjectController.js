collegeApp.controller('subjectController', function ($scope, subjectService, teacherService, courseService) {

    getSubjects();

    $scope.currentCourse = '';
    $scope.currentTeacher = '';

    $scope.subject = {
        Name: '',
        
    };


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

    function getSubjects() {
        subjectService.getAllSubjects().then(function (result) {

            $scope.Subjects = result.data;
        }, function (error) {
            alert("There was an error fetching the subjects." + error);
        })
    };


    $scope.insertSubject = () => {

        

        if (!$scope.addSubjectForm.$valid) {

            alert('All fields are required!');
            return;
        }

        let subjectAdded = subjectService.insertSubject($scope.subject).then(() => {
            alert('Subject added successfully.');
            $scope.clearData();
        }, function (error) {
            alert('There was an error adding the subject.');
        });
    };

    $scope.updateScopeSubject = function (Id) {

        let subject = $scope.Subjects.find(element => element.Id == Id);

        $scope.currentCourse = subject.Cours.Name;

        angular.copy(subject, $scope.subject);
    };

    $scope.updateSubject = () => {

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