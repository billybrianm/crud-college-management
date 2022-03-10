collegeApp.service('gradeService', function ($http) {

    this.getAllGrades = () => {
        return $http.get("/Grade/GetGrades")
    }

    this.insertGrade = function (grade) {
        let request = $http({
            method: 'post',
            url: '/Grade/InsertGrade',
            data: grade

        });

        return request;
    }

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
    }
});