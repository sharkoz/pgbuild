app.controller('OptionsCtrl', function($scope, $localStorage, AuthToken) {
    $scope.AuthToken = AuthToken;
	$scope.$storage = $localStorage;
});

app.controller('MainCtrl', function($scope, $localStorage, PgAPI) {
	$scope.$storage = $localStorage;
	PgAPI.getMe($localStorage.appToken);
	PgAPI.getApps($localStorage.appToken);
});