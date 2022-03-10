collegeApp.service('gradeService', function ($http) {

    this.getAllGrades = () => {
        return $http.get("/Grade/GetGrades");
    };    

    this.updateGrade = function (grade) {
        var updatedRequest = $http({
            method: 'post',
            url: '/Grade/UpdateGrade',
            data: grade
        });
        return updatedRequest;
    };    

    this.deleteGrade = function (gradeId) {
        return $http.post('/Grade/DeleteGrade/' + gradeId);
    };
});