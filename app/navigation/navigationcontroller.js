/**
 * Created by Personal on 07/11/2016.
 */
(function(){
    angular.module('unitedvolunteers')
        .controller('NavigationController', ['$scope', '$http', '$state', function($scope, $http, $state){
            console.log($scope.login);
            $scope.logUserIn = function(){
                $http.post('api/user/login', $scope.login).success(function (response) {
                    localstorage.setItem('User-data', JSON.stringify(response));
                }).error(function(error){
                    console.error(error);
                });
            }
        }]);
}());