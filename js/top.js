$(function() {
    $(document).ready(onReady);
    $('#add-todo').click(onAddTodoBtn);
    $(document).on('click', '#showmoreitems', onShowMoreItems);
});

var limit = 10;
var page = 1;

var html =
      '<li>'
    + '  <span class="title">{0}</span>'
    + '  <span class="content">{1}</span>'
    + '  <input type="checkbox" value="{2}">Done</input>'
    + '  <button value="{3}">Delete</button>'
    + '</li>';
    
var showmoreitems = '<li id="showmoreitems">Show more items</li>'

function onReady() {
    var loginuser = $.session.get('loginuser');
    $('#loginuser').text(loginuser);

    var Todo = Parse.Object.extend("Todo");
    var query = new Parse.Query(Todo);

    var User = Parse.Object.extend("User");
    var user = new User();
    var currentUser = Parse.User.current();
    user.id = currentUser.id;
    query.equalTo('User', user);

    var numberOfItems = 0;
    query.count({
        success: function(count) {
            numberOfItems = count;
            query.limit(10);
            query.skip(limit * (page - 1));
            query.descending('updatedAt');
            query.find({
                success: function(results) {
                    for (var i = 0; i < results.length; i++) { 
                        var item = results[i];
                        $("#list").append(html.format(item.get('title'), item.get('content'), item.id, item.id));
                    }
                    page = page + 1;
                    if($('#list').length < numberOfItems) {
                        $("#list").append(showmoreitems);
                    }
                },
                error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function onShowMoreItems(event) {
    var Todo = Parse.Object.extend("Todo");
    var query = new Parse.Query(Todo);

    var User = Parse.Object.extend("User");
    var user = new User();
    var currentUser = Parse.User.current();
    user.id = currentUser.id;
    query.equalTo('User', user);

    var numberOfItems = 0;
    query.count({
        success: function(count) {
            numberOfItems = count;
            query.limit(10);
            query.skip(limit * (page - 1));
            query.descending('updatedAt');
            query.find({
                success: function(results) {
                    for (var i = 0; i < results.length; i++) { 
                        var item = results[i];
                        $(html.format(item.get('title'), item.get('content'), item.id, item.id)).insertBefore($('#showmoreitems'));
                    }
                    page = page + 1;
                    if(($('#list li').length - 1) >= numberOfItems) {
                        $("#list li:last-child").remove();
                    }
                },
                error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function onAddTodoBtn() {
    $(location).attr('href', 'add.html');
}
