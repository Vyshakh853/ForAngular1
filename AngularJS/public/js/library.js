/*Declaring module*/
var app = angular.module("LibApp", []);
/*Declaring container*/
app.controller("listDisplay", function($scope, $http, $timeout, serverOperation) {
    $scope.MessageHide = true;
    $scope.prevButtonHide = true;
    $scope.nextButtonHide = true;
    $scope.tableshow = true;
    $scope.ErrorMsgHide = true;
    $scope.pageStart = 0;
    $scope.url = '';
    // Load all 
    $scope.loadAllBook = function() {
        $scope.url = '';
        getDetails('?_start=' + $scope.pageStart + '&_limit=101' + $scope.url);
    };
    /*Used for sort*/
    $scope.order = function(item) {
            $scope.orderByItem = item;
        }
        /*Search with value name.*/
    $scope.searchBook = function() {
            if ($scope.searchVal == undefined || $scope.searchVal == '') {
                showError("Please Enter something for searching.. ");
            } else {
                $scope.url = '&Book_name_like=' + $scope.searchVal;
                getDetails('?_start=' + $scope.pageStart + '&_limit=101' + $scope.url);
            }
        }
        /*Add new book*/
    $scope.addBook = function(book) {
    		console.log("Inside add book");
            serverOperation.postData(book)
                .then(function mySucces(response) {
                    $scope.MessageHide = false;
                    $scope.Message = "Wow.. Successfully added new Book !! ";
                    $timeout(function() {
                        $scope.MessageHide = true;
                    }, 5000);
                    
                    showInTable([response.data]);
                }, function myError(response) {
                    showError("Error on inserting the data. Please Try again..");
                })
        }
        // Edit Save book
    $scope.editSave = function(book) {
            console.log(book);
            serverOperation.putData(book)
                .then(function mySucces(response) {
                    $scope.MessageHide = false;
                    $scope.Message = "Wow.. Successfully edited the book details !! ";
                    $timeout(function() {
                        $scope.MessageHide = true;
                    }, 5000);
                    // $('#myModal').modal('toggle');
                    for (var i = 0; i < $scope.BookList.length; i++) {
                        if ($scope.BookList[i].id == response.id) {
                            $scope.BookList[i] = response;
                            break;
                        }
                    }
                }, function myError(response) {
                    showError("Error on inserting the data. Please Try again..");
                });
            showInTable($scope.BookList);
        }
        //Delete data
    $scope.deleteBook = function(id) {
            console.log("Inside deleted");
            serverOperation.deleteData(id)
                .then(function mySucces(response) {
                    $scope.MessageHide = false;
                    console.log("Deleted book");
                    $scope.Message = "Deleted Book successfully !! ";
                    $timeout(function() {
                        $scope.MessageHide = true;
                        for (var i = 0; i < $scope.BookList.length; i++) {
                            if ($scope.BookList[i].id == id) {
                                $scope.BookList.splice(i, 1);
                                break;
                            }
                        }
                    }, 3000);
                }, function(response) {
                    showError("Error on deleting the book");
                });
        }
        // add book
    $scope.add = function() {
            $scope.book = '';
            $scope.addButtonShow = true;
            $scope.editButtonShow = false;
        }
        // Edit button click
    $scope.editBook = function(book) {
            $scope.book = book;
            $scope.addButtonShow = false;
            $scope.editButtonShow = true;
        }
        // Error display
    var showError = function(errorMessage) {
    		$scope.prevButtonHide=true;
    		$scope.nextButtonHide=true;
            $scope.tableshow = true;
            $scope.ErrorMsgHide = false;
            $scope.ErrorMsg = errorMessage;
        }
        // Pagination
    $scope.pagePrev = function() {
        $scope.pageStart = $scope.pageStart - 100;
        if ($scope.pageStart == 0) {
            $scope.prevButtonHide = true;
        }
        getDetails('?_start=' + $scope.pageStart + '&_limit=101' + $scope.url);
    }
    $scope.pageNext = function() {
            $scope.prevButtonHide = false;
            $scope.pageStart = $scope.pageStart + 100;
            console.log('start: ' + $scope.pageStart);
            console.log('?_start=' + $scope.pageStart + '&_limit=101' + $scope.url);
            getDetails('?_start=' + $scope.pageStart + '&_limit=101' + $scope.url);
        }
        // Display in table
    var showInTable = function(data) {
            if (data.length == 101) {
                $scope.nextButtonHide = false;
            } else {
                $scope.nextButtonHide = true;
            }
            if(data.length)
            $scope.tableshow = false;
            $scope.ErrorMsgHide = true;
            $scope.BookList = data;
        }
        /*Get call*/
    var getDetails = function(urlCondition) {
        serverOperation.getBookDetails(urlCondition)
            .then(function mySucces(response) {
                if (response.data.length == 0) {
                    showError("Sorry. No Books Available with your search.. ");
                } else {
                    showInTable(response.data);
                }
            }, function myError(response) {
                showError(response.statusText);
            });
    }

});

/*Services for server side operations*/
app.service('serverOperation', function($http) {
    this.getBookDetails = function(urlCondition) {
        console.log(urlCondition);
        return $http.get('http://localhost:8080/Books/' + urlCondition);
    }
    this.postData = function(data) {
        return $http.post('http://localhost:8080/Books/', data);
    }
    this.putData = function(data) {
        return $http.put('http://localhost:8080/Books/' + data.id, data);
    }
    this.deleteData = function(id) {
        return $http.delete('http://localhost:8080/Books/' + id);
    }
});
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

