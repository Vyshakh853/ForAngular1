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