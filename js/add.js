$(function() {
    $(document).ready(onReady);
    $('#save-todo').click(onSaveTodoBtn);
});

function onReady() {
}

function onSaveTodoBtn() {
    var title = $('#title').val();
    var content = $('#content').val();
    console.log(title);
    console.log(content);

    var Todo = Parse.Object.extend("Todo");
    var todo = new Todo();
    todo.set("Title", title);
    todo.set("Content", content);

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

