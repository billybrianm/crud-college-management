(function () {
    collegeApp.value('$', $);

    collegeApp.factory('signalService', ['$', '$rootScope',
        function ($, $rootScope) {
            var proxy;
            var connection;
            return {
                connect: function () {
                    connection = $.hubConnection();
                    proxy = connection.createHubProxy('HubMessage');
                    connection.start();
                    proxy.on('messageAdded', function (remetente, destinatario, message) {
                        $rootScope.$broadcast('messageAdded', remetente, destinatario, message);
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
                sendMessage: function (remetente, destinatario, message) {
                    proxy.invoke('SendMessage', remetente, destinatario, message);
                },
            }
        }]);

    collegeApp.controller('messageController', function ($scope, signalService) {

        signalService.connect();
        $scope.messages = [];

        $scope.$on('messageAdded', function (event, remetente, destinatario, message) {
            var mensagem = { de: remetente, para: destinatario, mensagem: message };
            $scope.messages.push(mensagem);
            $scope.$apply();
        });

        $scope.sendMessage = function () {
            signalService.sendMessage($scope.remetente, $scope.destinatario, $scope.mensagem);
        };
    });
})()