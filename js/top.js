$(function() {
    $(document).ready(onReady);
    $('#add-todo').click(onAddTodoBtn);
});

var limit = 10;
var page = 1;

var html =
      '<li>'
    + '  <span class="title">{0}</span>'
    + '  <span class="content">{1}</span>'
    + '<li>';
    
var showmoreitems = '<li>Show more items</li>'

function onReady() {
    var loginuser = $.session.get('loginuser');
    $('#loginuser').text(loginuser);

    var Todo = Parse.Object.extend("Todo");
    var query = new Parse.Query(Todo);
    query.limit(10);
    query.skip(limit * page);
    query.descending('updatedAt');
    query.find({
        success: function(results) {
            alert("Successfully retrieved " + results.length + " scores.");
            for (var i = 0; i < results.length; i++) { 
                var object = results[i];
                alert(object.id + ' - ' + object.get('playerName'));
            }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function onAddTodoBtn() {
    $(location).attr('href', 'add.html');
}
