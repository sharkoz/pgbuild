app.factory('DataSource', ['$http',function($http){
  return {
    get: function(callback,errorcallback, url){
      $http
          .jsonp(url, {timeout:17000})
          .success(function(data, status) { callback(data);  })
          .error(function(data, status) { errorcallback(data);  })
    } ,
	post: function(callback,errorcallback, url){
      $http
          .post(url+"&callback=JSON_CALLBACK", {timeout:17000})
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
      DataSource.post(this.setApp, this.err, "http://rlier.fr/pgbuild/server/api/post/"+this.authToken);
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
      DataSource.get(this.setApps, this.err, "https://build.phonegap.com/api/v1/apps?access_token="+appToken);
    },
    setMe : function(me){
		$localStorage.me = me;
    },
    getMe : function(appToken){
      DataSource.get(this.setMe, this.err, "https://build.phonegap.com/api/v1/me?access_token="+appToken);
    },
	err : function(){
    }
  }
 });