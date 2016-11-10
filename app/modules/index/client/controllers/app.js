(function(){
    angular.module('unitedvolunteers', ['ui.router']).config(function($stateProvider){
        $stateProvider
            .state('signUp', {
                url: "/signup",
                templateUrl: "app/modules/newUsers/client/views/signup.html",
                controller: "UserController"
            })
    });
    angular.module('unitedvolunteers')
        .controller('UserController', ['$scope', '$state', '$http', function($scope, $state, $http){
            $scope.createUser = function(){
                $scope.newUser = {firstName: $scope.newUser.firstName, lastName: $scope.newUser.lastName, gender: $scope.newUser.gender, address: $scope.newUser.address, skill: $scope.newUser.skill, volunteeringArea: $scope.newUser.volunteeringArea, username: $scope.newUser.username, password: $scope.newUser.password, email: $scope.newUser.email};
                console.log($scope.newUser);
                $http.post('/api/newUsers/client/views/signup', $scope.newUser).success(function(response){

                }).error(function(error){
                    console.log(error);
                })
            }
        }]);
    angular.module('unitedvolunteers')
        .controller('NavigationController', ['$scope', '$http', '$state', function($scope, $http, $state){
            $scope.login = {username: $scope.login.username, password: $scope.login.password};
            console.log($scope.login);
            $scope.logUserIn = function(){
                $http.post('api/index/client/views/index', $scope.login).success(function (response) {
                    localstorage.setItem('User-data', JSON.stringify(response));
                }).error(function(error){
                    console.error(error);
                });
            }
        }]);
    angular.module('unitedvolunteers').controller('DatepickerPopupDemoCtrl', function ($scope) {
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
    });
}());