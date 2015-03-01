//(function(){
  var app = angular.module('StackOverflow',['stack-directives', 'ngRoute', 'ngStorage', 'ui.router']);
	
  app.controller('QuestionsController',['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window){
    
    var temp = this;
    temp.questions = [];		
    this.question = {};
    
    this.addQuestion = function(){
      var data1 = this.question;	
      $http.post('http://localhost:3000/questions', data1, { responseType: 'json', headers: {'Authorization': 'Token token='+$window.sessionStorage.token}
}).success(function(status, headers){
            //alert(JSON.stringify(data1));  
            $location.path('/questions');
        }).
        error(function(data, status, headers, config){		
          alert( "Failure: " + JSON.stringify({data: data1}));
      });
        this.question = {};
    };
            
    $http.get('http://localhost:3000/aboutQuestions.json', { responseType: 'json'}).success(function(data){
		temp.questions = data;
    }).
		error(function(data, status, headers, config){				
    });
      
    
  }]);
  
function CustomAlert() {
 this.render= function(dialog, dialog2){
     var winW = window.innerWidth;
     var winH= window.innerHeight;
     var dialogbox = document.getElementById('dialogbox');
     dialogbox.style.left=(winW/2)-(550 * .5)+"px";
     dialogbox.style.top= "100px";
     dialogbox.style.display="block";
     document.getElementById('dialogboxhead').innerHTML=dialog2;
     document.getElementById('dialogboxbody').innerHTML=dialog;
     document.getElementById('dialogboxfoot').innerHTML='<button onclick="Alert.ok()">OK</button>';
 }
 this.ok = function(){
     document.getElementById('dialogbox').style.display="none";
 }
    
}

  var Alert = new CustomAlert();
  

  
  app.config(['$routeProvider', '$stateProvider',
          function($routeProvider, $stateProvider) {
//              $stateProvider
//                  .state('questions', {
//                    url: '/questions',
//                    // ...
//                    data: {
//                      requireLogin: false
//                    }
//                  })
//                  .state('ask-question', {
//                    url: '/ask-question',
//                    // ...
//                    data: {
//                      requireLogin: true
//                    }
//                  });
//                  .state('app', {
//                    abstract: true,
//                    // ...
//                    data: {
//                      requireLogin: true // this property will apply to all children of 'app'
//                    }
//                  })
//                  .state('app.dashboard', {
//                    // child state of `app`
//                    // requireLogin === true
//                  })
            
              $routeProvider.
                  when('/ask-question', {
                        templateUrl: 'ask-question.html',
                        controller: 'RouteController'
                    }).
                    when('/questions', {
                        templateUrl: 'questions.html',
                        controller: 'QuestionsController'
                    }).
                    when('/questions/:id', {
                              templateUrl: 'question.html',
                              controller: 'QuestionController'
                          }).
                     when('/unanswered', {
                              templateUrl: 'unanswered.html',
                              controller: 'RouteController'
                          }).
                    when('/my-account', {
                        templateUrl: 'my-account.html',
                        controller: 'UserController'
                    }).
                    when('/log-in', {
                        templateUrl: 'log-in.html',
                        controller: 'UserController'
                    }).
                    when('/sign-up', {
                        templateUrl: 'sign-up.html',
                        controller: 'UserController'
                    }).
                    otherwise({
                        redirectTo: '/questions'
                    });
            
              
  }]);

  app.controller("RouteController", function($scope, $routeParams) {
    $scope.id = $routeParams.id;
    
  });
  
  
  
  app.controller('QuestionController',['$scope', '$http', '$routeParams', '$route', '$window', function($scope, $http, $routeParams, $route, $window){
    $scope.question_id = $routeParams.id;
    var temp = this;
    temp.question = null;
    temp.answers = [];
    
    $http.get('http://localhost:3000/questions/'+$scope.question_id+'.json', { responseType: 'json'}).success(function(data){
		temp.question = data;
    }).
		error(function(data, status, headers, config){				
    });
    
    $http.get('http://localhost:3000/questions/'+$scope.question_id+'/answers.json', { responseType: 'json'}).success(function(data){
		temp.answers = data;
    }).
		error(function(data, status, headers, config){				
    });
      
    this.answer = {};
    this.addAnswer = function(){
      var data1 = this.answer;	
      $http.post('http://localhost:3000/questions/'+$scope.question_id+'/answers', data1, { responseType: 'json', headers: {'Authorization': 'Token token='+$window.sessionStorage.token}}).success(function(status, headers){
            //alert($scope.question_id + " " + JSON.stringify(data1));     
          $route.reload();
        }).
        error(function(data, status, headers, config){		
          alert($scope.question_id + " " + "Failure: " + JSON.stringify({data: data1}));
      });
        this.answer = {};
    };
    
  }]);
  
  app.filter('nl2br', ['$sce', function ($sce) {
        return function (text) {
            return text ? $sce.trustAsHtml(text.replace(/\n/g, '<br/>')) : '';
        };
    }])
  
  
  app.controller('UserController',['$scope', '$http', '$window', 'loginService', '$localStorage', '$location',  function($scope, $http, $window, loginService, $localStorage, $location){
    
        
    /*$scope.login = function(data){
        loginService.login(data,$scope); //call login service
    };*/
        
    var temp = this;
    //temp.questions = [];		
    this.user = {};
     $scope.message = '';
    
    this.addUser = function(){
      var data1 = this.user;	
      $http.post('http://localhost:3000/users', data1, { responseType: 'json'}).success(function(status, headers){
            //alert(JSON.stringify(data1));            
        }).
        error(function(data, status, headers, config){		
          Alert.render("Istnieje użytkownik o danym loginie","BŁĄD");
      });
        this.user = {};
    };
    
    this.login = function(){
      var data1 = this.user;	
      $http.post('http://localhost:3000/users/sign_in', data1, { responseType: 'json'}).success(function(data, status, headers, config){
          $window.sessionStorage.user_id = data[0];
          $window.sessionStorage.token = data[1];
           switch(status){
                 
                 case 200: $scope.msg='Zostałeś zalogowany jako: '; Alert.render("Zostałeś zalogowany jako: " + data1.login, "WITAJ"); break;
                 case 401: alert("niezalogowany"); break;
         }
          //alert("super" + " " + $window.sessionStorage.user_id[0]);
          $location.path('/questions');
          
        }).
        error(function(data, status, headers, config){		
          if(status==401)Alert.render("Niepoprawne hasło", "BŁĄD");
          if(status==500)Alert.render( "Nie istnieje użytkownik o podanym loginie","BŁĄD");
          // Erase the token if the user fails to log in
          delete $window.sessionStorage.user_id;
        delete $window.sessionStorage.token;

          // Handle login errors here
          $scope.message = 'Error: Invalid user or password';
      });
        this.user = {};
    };
   
      
    
    this.logout = function(){      
      $http.get('http://localhost:3000/sign_out', { responseType: 'json'}).success(function(data){
		//temp.questions = data;
        delete $window.sessionStorage.user_id;
        delete $window.sessionStorage.token;
        Alert.render("Zostałeś wylogowany", "");
    }).
		error(function(data, status, headers, config){				
    });
      
//      var data1 = this.user;	
//      $http.post('http://localhost:3000/users/sign_in', data1, { responseType: 'json'}).success(function(data, status, headers, config){
//          /*$window.sessionStorage.token = data.token;
//          $scope.message = 'Welcome';*/
//        }).
//        error(function(data, status, headers, config){		
//          alert( "Failure: " + JSON.stringify({data: data1}));
//          // Erase the token if the user fails to log in
//          //delete $window.sessionStorage.token;
//
//          // Handle login errors here
//          //$scope.message = 'Error: Invalid user or password';
//      });
//        this.user = {};
    
    
    };
  }]);
  
//})();



/*window.addCart = function($scope, $http, $window, $document){
  
    var getValue = function(){
        return $window.sessionStorage.length;
    }
      
    var getData = function(){
      var json = [];
      $.each($window.sessionStorage, function(i, v){
        json.push(angular.fromJson(v));
      });
      return json;
    }
      
    $scope.images = getData();
    $scope.count = getValue();
  
    $scope.addItem = function(id){
        var image = document.getElementById('img'+id);
        json = {
          id: id,
          img: image.src
        }
        $window.sessionStorage.setItem(id, JSON.stringify(json));
        $scope.count = getValue();
        $scope.images = getData();
    }
    
    $scope.removeItem = function(id){
      $window.sessionStorage.removeItem(id);
      $document.
      $scope.count = getValue();
      $scope.images = getData();
      alert('Removed with Success!');
    }
}*/


/*app.run(function($rootScope, $location, loginService){
	var routespermission=['/questions'];  //route that require login
	$rootScope.$on('$routeChangeStart', function(){
		if( routespermission.indexOf($location.path()) !=-1)
		{
			/*var connected=loginService.islogged();
			connected.then(function(msg){
				if(!msg.data) $location.path('/log-in');
			})
		}
	});
});*/

//app.run(function ($rootScope) {
//  $rootScope.$on('$stateChangeStart', '$window', function (event, toState, toParams, $window) {
//    var requireLogin = toState.data.requireLogin;
//    console.log(requireLogin);
//    alert(requireLogin);
//    if (requireLogin && typeof $window.sessionStorage.user_id === 'undefined') {
//      //event.preventDefault();
//      // get me a login modal!
//      alert('gdgfjj');
//      console.log('weitur');
//    }
//  });
//
//});