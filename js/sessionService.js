app.factory('sessionService', ['$http', function($http){
  return{
    set: function(key, value){
      return sessionStorage.setItem(key, value);
    },
    get: function(){
      return sessionStorage.getItem(key);
    },
    destroy: function(){
      return sessionStorage.removeItem(key);
    }
  };

}]);
  