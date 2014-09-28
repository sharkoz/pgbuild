app.factory('DataSource', ['$http',function($http){

	// 2 - Check if accessed via web or via PhoneGap app and change api URL accordingly
    var nativeapp = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
	if ( nativeapp ) {
	    // PhoneGap application
		apiUrl = "http://rlier.fr/pgbuild/server/api";
		phonegap = true;		
	} else {
	    // Web page
        if(document.URL.indexOf( 'localhost' ) !== -1) {
			apiUrl = "http://rlier.fr/pgbuild/server/api";
           }
	    else {
			apiUrl = "../server/api";	
        }
	}

  return {
    url: apiUrl ,
    get: function(callback,errorcallback, path){
      $http
          .get(this.url+path, {timeout:17000})
          .success(function(data, status) { callback(data);  })
          .error(function(data, status) { errorcallback(data);  })
    } ,
	post: function(callback,errorcallback, path){
      $http
          .post(this.url+path, {timeout:17000})
          .success(function(data, status) { callback(data);  })
          .error(function(data, status) { errorcallback(data);  })
    } ,
	put: function(callback,errorcallback, path, data){
      $http
          .put(this.url+path, data,{timeout:17000})
          .success(function(data, status) { callback(data);  })
          .error(function(data, status) { errorcallback(data);  })
    }
  }
 }]);
 
 app.factory('AuthToken', function($localStorage, DataSource){
	var that = this;
  return {
	"authToken" : $localStorage.authToken || "" ,
	"appToken" : $localStorage.appToken || "" ,
	setApp : function(token){
		that.appToken = token.access_token || "";
		console.log(token.access_token);
		$localStorage.appToken = token.access_token || "";
		} ,
	setAuth : function(token){
		$localStorage.authToken = token;
		} ,
    refresh : function(){
	  this.setAuth(this.authToken);
	  this.setApp("");
      DataSource.post(this.setApp, this.err, "/post/"+this.authToken);
    } ,
	err : function(){
    }
  }
 });
 
  app.factory('PgAPI', function($localStorage, DataSource){
	var that = this;
  return {
    setApps : function(apps){
		$localStorage.apps = apps;
    },
    getApps : function(appToken){
      DataSource.get(this.setApps, this.err, "/api/v1/apps?access_token="+appToken);
    },
    setMe : function(me){
		$localStorage.me = me;
    },
    getMe : function(appToken){
      DataSource.get(this.setMe, this.err, "/api/v1/me?access_token="+appToken);
    },
	setDetails : function(details){
		$localStorage.details[$localStorage.appId] = details;
    },
    getDetails : function(appToken, appId){
	  $localStorage.appId = appId;
      DataSource.get(this.setDetails, this.err, "/api/v1/apps/"+appId+"?access_token="+appToken);
    },
	pullApp : function(appToken, appId){
	  $localStorage.appId = appId;
      DataSource.put(this.err, this.err, "/api/v1/apps/"+appId+"?access_token="+appToken, {"pull":"true"});
    },
	err : function(){
    }
  }
 });
 
 