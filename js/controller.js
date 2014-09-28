app.controller('OptionsCtrl', function($scope, $localStorage, AuthToken) {
    $scope.AuthToken = AuthToken;
	$scope.$storage = $localStorage;
});

app.controller('MainCtrl', function($scope, $localStorage, $timeout, PgAPI) {
	$scope.$storage = $localStorage;
	$scope.PgAPI = PgAPI;
	//PgAPI.getMe($localStorage.appToken);
	//PgAPI.getApps($localStorage.appToken);
	
	var getAppsLoop = function() {
		PgAPI.getApps($localStorage.appToken);
        $timeout(getAppsLoop, 8000);
    }

    getAppsLoop();
	
});

app.controller('DetailsCtrl', function($scope, $localStorage, PgAPI, $stateParams) {
	
	// Init variables if they don't exist
	if($localStorage.details){}
	else{$localStorage.details=new Object() ;};
	if($localStorage.details[$localStorage.appId]){}
	else{$localStorage.details[$localStorage.appId]=new Object();};
	
	// Get the details on the app
	PgAPI.getDetails($localStorage.appToken, $stateParams.id);
	
	// Bind displayed values to localstorage
	$scope.$storage = $localStorage.details[$localStorage.appId];
});