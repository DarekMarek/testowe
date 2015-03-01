(function(){
	var app = angular.module('stack-directives',[]);	
	app.directive('items', function(){
		return{
			restrict: 'E',
			templateUrl: 'items.html'
		};
	});
	
	app.directive('itemTabs', function(){
		return{
			restrict: 'E',
			templateUrl: 'item-tabs.html'
		};
	});
	
	app.directive('newItem', function(){
		return{
			restrict: 'E',
			templateUrl: 'new-item.html'
		};
	});
	
	app.directive('navs', function(){
		return{
			restrict: 'E',
			templateUrl: 'navs.html'
		};
	});
	app.directive('dropdown', function(){
		return{
			restrict: 'E',
			templateUrl: 'dropdown.html'
		};
	});
	
    app.directive('pwCheck', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var firstPassword = '#' + attrs.pwCheck;
        elem.add(firstPassword).on('keyup', function () {
          scope.$apply(function () {
            var v = elem.val()===$(firstPassword).val();
            ctrl.$setValidity('pwmatch', v);
          });
        });
      }
    }
  }]);
  
})();



