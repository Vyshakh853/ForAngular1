app.controller("addController", function($scope, serverOperation, $timeout) {
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

            }, function myError(response) {
                showError("Error on inserting the data. Please Try again..");
            })
    }
});
app.controller("editController", function($scope, serverOperation, $timeout) {
        $scope.editSave = function(book) {
            console.log(book);
            serverOperation.putData(book)
                .then(function mySucces(response) {
                    $scope.MessageHide = false;
                    $scope.Message = "Wow.. Successfully edited the book details !! ";
                    $timeout(function() {
                        $scope.MessageHide = true;
                    }, 5000);
                    for (var i = 0; i < $scope.BookList.length; i++) {
                        if ($scope.BookList[i].id == response.id) {
                            $scope.BookList[i] = response;
                            break;
                        }
                    }
                }, function myError(response) {
                    showError("Error on inserting the data. Please Try again..");
                });
            };
    });