Parse.$ = jQuery;

// Initialize Parse with your Parse application javascript keys
Parse.initialize("JbuigOvZ1yQBh8yxXrXbx58SxGit4bf9eaElBE7S"
                , "JwfpSCPYKjfQv95dPtmdU3pbub05cbGVJZlp4cYs");

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

$(function() {
    $(document).ready(onInit);
    $('#logout').click(onLogout);
});

function onInit() {
    var currentUser = Parse.User.current();
    var currentFilename = $.mobile.path.parseLocation().filename;
    if(!currentUser && currentFilename != 'index.html') {
        console.log('Authentication error');
        $(location).attr('href', 'index.html');
    } 
}

function onLogout() {
    Parse.User.logOut();
    console.log('Logout');
    $(location).attr('href', 'index.html');
}
