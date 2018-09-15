(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .factory('TopboxFactory', TopboxFactory)
        .service('dataService', dataService);

    /** @ngInject */
    function TopboxFactory($http, Config, $q) {
        return {
            getItem: getItem,
            editItem: editItem
        };

        function getItem(token) {
            var fd = new FormData();
            fd.append("remember_token", token);
            var request = $http({
                method: 'POST',
                headers: {'Content-Type': undefined},
                url: Config.getTopBox,
                data: fd
            });

            return (request.then(handleSuccess, handleError));
        }

        function editItem(data) {

            var request = $http({
                method: 'POST',
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                url: Config.updateTopBox,
                data: data
            });

            return (request.then(handleSuccess, handleError));
        }

        function handleSuccess(response) {
            return (response.data);
        }

        function handleError(response) {
            if (!angular.isObject(response.data) || !response.data.message) {
                return ($q.reject("An unknown error occurred."));
            }
            return ($q.reject(response.data.message));
        }
    }

    function dataService() {
        var _editID = null, _canAdd = null;
        this.editID = _editID;
        this.canAdd = _canAdd;
    }

})();
