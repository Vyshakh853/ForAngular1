/*Directive for table display*/
app.directive('tableDisplay',function(){
	return {
		restrict: 'E',
		templateUrl: '../table-display.html'
	};
});

app.directive('modalDisplay',function(){
	return {
		restrict: 'E',
		templateUrl: '../modal.html'
	};
});
