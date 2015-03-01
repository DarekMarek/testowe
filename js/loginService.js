//app.factory('loginService', function($http, $location, sessionService){
//  return{
//    login: function(data, scope){      
//      var $promise= $http.post('http://localhost:3000/users/sign_in', data);
//      
//      $promise.then(function(msg){
//        var uid=msg.data;
//        if(uid){
//          window.alert('123');
//          sessionService.set('user', uid);
//          //$location.path('/questions');
//        }
//        else{
//          window.alert('987');
//          scope.msgtxt='incorect information';
//          //$location.path('/log-in');
//      }
//    });
//  }};
//});


app.factory('loginService',function($http, $location, sessionService){
	return{
		login:function(data,scope){
			var $promise=$http.post('http://localhost:3000/users/sign_in',data); //send data to user.php
			$promise.then(function(msg){
				var uid=msg.data;
				if(uid){
					//scope.msgtxt='Correct information';
					sessionService.set('uid',uid);
					$location.path('/home');
				}	       
				else  {
					scope.msgtxt='incorrect information';
					$location.path('/login');
				}				   
			});
		},
		logout:function(){
			sessionService.destroy('uid');
			$location.path('/login');
		}
//		islogged:function(){
//			var $checkSessionServer=$http.post('data/check_session.php');
//			return $checkSessionServer;
//			/*
//			if(sessionService.get('user')) return true;
//			else return false;
//			*/
//		}
	}

});