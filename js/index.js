$(function() {
    $(document).ready(onReady);
    $('#login_btn').click(onLoginBtn);
});

function onReady() {
}

function onLoginBtn() {
    var username = $('#username').val();
    var password = $('#password').val();
    var error_username = '';
    var error_password = '';
    if(username == '') {
        error_username = 'User Name is required.';
    }
    if(password == '') {
        error_password = 'Password is required.';
    }
    if(error_username == '' && error_password == '') {
        Parse.User.logIn(username, password, {
            success:function(result) {
                console.log('success');
                console.log(result);
                $.session.set('loginuser', result.get('username'));
                $(location).attr('href', 'top.html');
            },
            error:function(error) {
                console.error(error);
                $('#error_username').text('Invalid username or password.');
                $('#error_password').text('');
            }
        });
    } else {
        $('#error_username').text(error_username);
        $('#error_password').text(error_password);
    }
}
