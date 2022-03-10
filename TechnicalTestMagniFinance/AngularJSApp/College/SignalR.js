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
                    proxy.on('messageAdded', function (remetente, destinatario, message) {
                        $rootScope.$broadcast('messageAdded', remetente, destinatario, message);
                    });

                    proxy.on('studentAdded', function (student) {
                        $rootScope.$broadcast('studentAdded', student);
                    });

                    proxy.on('studentUpdated', function (student) {
                        $rootScope.$broadcast('studentUpdated', student);
                    });

                    proxy.on('studentDeleted', function (student) {
                        $rootScope.$broadcast('studentDeleted', student);
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