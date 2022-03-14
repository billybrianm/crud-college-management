collegeApp.service('subjectService', function ($http) {

    this.getAllSubjects = () => {
        return $http.get("/Subject/GetSubjects")
    };

    this.getListSubjectInfos = () => {
        return $http.get("/Subject/GetListSubjectInfos");
    };

    this.getSubject = (ID) => {
        return $http.get("/Subject/GetSubject/" + ID)
    };

    this.getSubjectStudents = (ID) => {
        return $http.get("/Subject/GetSubjectStudents/" + ID);
    };

    this.enrollStudent = function (grade) {
        let request = $http({
            method: 'post',
            url: '/Grade/InsertGrade',
            data: grade
        });

        return request;
    };

    this.insertSubject = function (subject) {
        let request = $http({
            method: 'post',
            url: '/Subject/InsertSubject',
            data: subject

        });

        return request;
    };

    this.updateSubject = function (subject) {
        var updatedRequest = $http({
            method: 'post',
            url: '/Subject/UpdateSubject',
            data: subject
        });
        return updatedRequest;
    };

    this.unenrollStudent = function (grade) {
        var request = $http({
            method: 'post',
            url: '/Subject/UnenrollStudent',
            data: grade
        });

        return request;
    };

    this.deleteSubject = function (subjectID) {
        return $http.post('/Subject/DeleteSubject/' + subjectID);
    };
});