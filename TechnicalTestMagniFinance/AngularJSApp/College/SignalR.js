(function () {
    collegeApp.value('$', $);

    collegeApp.factory('signalrService', ['$', '$rootScope',
        function ($, $rootScope) {
            var proxy;
            var connection;
            return {
                connect: function () {
                    connection = $.hubConnection();
                    proxy = connection.createHubProxy('collegeHub');
                    connection.start();

                    proxy.on('studentAdded', function (student) {
                        $rootScope.$broadcast('studentAdded', student);
                    });

                    proxy.on('studentUpdated', function (student) {
                        $rootScope.$broadcast('studentUpdated', student);
                    });

                    proxy.on('studentDeleted', function (student) {
                        $rootScope.$broadcast('studentDeleted', student);
                    });

                    proxy.on('courseAdded', function (course) {
                        $rootScope.$broadcast('courseAdded', course);
                    });

                    proxy.on('courseUpdated', function (course) {
                        $rootScope.$broadcast('courseUpdated', course);
                    });

                    proxy.on('courseDeleted', function (course) {
                        $rootScope.$broadcast('courseDeleted', course);
                    });

                    proxy.on('subjectAdded', function (subject) {
                        $rootScope.$broadcast('subjectAdded', subject);
                    });

                    proxy.on('subjectUpdated', function (subject) {
                        $rootScope.$broadcast('subjectUpdated', subject);
                    });

                    proxy.on('subjectDeleted', function (subject) {
                        $rootScope.$broadcast('subjectDeleted', subject);
                    });

                    proxy.on('teacherAdded', function (teacher) {
                        $rootScope.$broadcast('teacherAdded', teacher);
                    });

                    proxy.on('teacherUpdated', function (teacher) {
                        $rootScope.$broadcast('teacherUpdated', teacher);
                    });

                    proxy.on('teacherDeleted', function (teacher) {
                        $rootScope.$broadcast('teacherDeleted', teacher);
                    });
                },
                isConnecting: function () {
                    return connection.state === 0;
                },
                isConnected: function () {
                    return connection.state === 1;
                },
                connectionState: function () {
                    return connection.state;
                },
                studentAdded: function (student) {
                    proxy.invoke('StudentAdded', student);
                },
                studentUpdated: function (student) {
                    proxy.invoke('StudentUpdated', student);
                },
                studentDeleted: function (student) {
                    proxy.invoke('StudentDeleted', student);
                },
                courseAdded: function (course) {
                    proxy.invoke('CourseAdded', course);
                },
                courseUpdated: function (course) {
                    proxy.invoke('CourseUpdated', course);
                },
                courseDeleted: function (course) {
                    proxy.invoke('CourseDeleted', course);
                },
                subjectAdded: function (subject) {
                    proxy.invoke('SubjectAdded', subject);
                },
                subjectUpdated: function (subject) {
                    proxy.invoke('SubjectUpdated', subject);
                },
                subjectDeleted: function (subject) {
                    proxy.invoke('SubjectDeleted', subject);
                },
                teacherAdded: function (teacher) {
                    proxy.invoke('TeacherAdded', teacher);
                },
                teacherUpdated: function (teacher) {
                    proxy.invoke('TeacherUpdated', teacher);
                },
                teacherDeleted: function (teacher) {
                    proxy.invoke('TeacherDeleted', teacher);
                },
            }
        }]);

    collegeApp.controller('messageController', function ($scope, signalrService) {

        signalrService.connect();
        $scope.messages = [];

        $scope.$on('messageAdded', function (event, remetente, destinatario, message) {
            var mensagem = { de: remetente, para: destinatario, mensagem: message };
            $scope.messages.push(mensagem);
            $scope.$apply();
        });

        $scope.sendMessage = function () {
            signalrService.sendMessage($scope.remetente, $scope.destinatario, $scope.mensagem);
        };
    });
})()