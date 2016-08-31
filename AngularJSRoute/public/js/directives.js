/*Directive for table display*/
app.directive('tableDisplay',function(){
	return {
		restrict: 'E',
		templateUrl: '../directives/table-display.html'
	};
});

app.directive('modalDisplay',function(){
	return {
		restrict: 'E',
		templateUrl: '../directives/modal.html'
	};
});
