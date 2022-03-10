collegeApp.service('subjectService', function ($http) {

    this.getAllSubjects = () => {
        return $http.get("/Subject/GetSubjects")
    }

    this.getSubject = (Id) => {
        return $http.get("/Subject/GetSubject/" + Id)
    }

    this.insertSubject = function (subject) {
        let request = $http({
            method: 'post',
            url: '/Subject/InsertSubject',
            data: subject

        });

        return request;
    }

    this.updateSubject = function (subject) {
        var updatedRequest = $http({
            method: 'post',
            url: '/Subject/UpdateSubject',
            data: subject
        });
        return updatedRequest;
    };

    this.deleteSubject = function (subjectId) {
        return $http.post('/Subject/DeleteSubject/' + subjectId);
    }
});