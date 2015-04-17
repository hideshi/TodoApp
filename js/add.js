$(function() {
    $(document).ready(onReady);
    $('#save-todo').click(onSaveTodoBtn);
});

function onReady() {
}

function onSaveTodoBtn() {
    var title = $('#title').val();
    var content = $('#content').val();
    var currentUser = Parse.User.current();

    var Todo = Parse.Object.extend("Todo");
    var todo = new Todo();
    todo.set("title", title);
    todo.set("content", content);
    todo.set("status", false);

    var User = Parse.Object.extend("User");
    var user = new User();
    user.id = currentUser.id;
    todo.set('User', user);

    todo.save(null, {
        success: function(todo) {
            alert("Success");
            $(location).attr('href', 'top.html');
        },
        error: function(todo, error) {
            alert("Error: " + error.code + " " + error.message);
            $(location).attr('href', 'top.html');
        }
    });
}

