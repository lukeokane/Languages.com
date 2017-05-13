

var $reg_username = $('#register_username');
var $reg_email = $('#register_email');
var $reg_password = $('#register_password');

function register() {
    var user = {
        registerUsername: $reg_username.val(),
        registerEmail: $reg_email.val(),
        registerPassword: $reg_password.val()
    };
    
    $.ajax({
        type: 'POST',
        url: 'http://www.lukeokane.com/register.php',
        data: user,
    success: function() {
         $("#alert").fadeOut();
            $("#alert").removeClass();
            $("#alert").addClass("alert alert-success");
            $("#alert").empty();
            $("#alert").append("You have registered successfully.");
            $("#alert").fadeIn();
        },
        error: function() {
            alert('Error registering user');
        }
        
    });
};