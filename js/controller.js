app.controller('OptionsCtrl', function($scope, $localStorage, AuthToken) {
    $scope.AuthToken = AuthToken;
	$scope.$storage = $localStorage;
});

app.controller('OptionsCtrl2', function($scope, $localStorage, AuthToken) {
	$scope.AuthToken = AuthToken;
	$scope.$storage = $localStorage;

	$scope.auth = function(){
		authUrl = "https://build.phonegap.com/authorize?client_id=e499d3af5e18baa92d6b";
		$scope.authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no');

		$scope.authWindow.addEventListener('loadstart', function(e) {
		  var url = e.originalEvent.url;
		  var code = /\?code=(.+)$/.exec(url);
		  var error = /\?error=(.+)$/.exec(url);
		  console.log(e);
		  if (code || error) {
		    authWindow.close();
		  }

		  if (code) {
		    console.log(code);
		  }
		  if (error) {
		    console.log(error);
		  }

		  //TODO - exchange code for access token...
		});		

		$scope.authWindow.onchange(function() {
		  var url = scope.authWindow.location.href;
		  var code = /\?code=(.+)$/.exec(url);
		  var error = /\?error=(.+)$/.exec(url);
		  console.log(e);
		  if (code || error) {
		    authWindow.close();
		  }

		  if (code) {
		    console.log(code);
		  }
		  if (error) {
		    console.log(error);
		  }

		  //TODO - exchange code for access token...
		});
	}
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