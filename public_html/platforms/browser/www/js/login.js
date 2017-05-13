var $login_username = $('#login_username');
var $login_password = $('#login_password');



$(document).ready(function ()
    {
        $("#login_button").click(
                function login()
                    {
                        var user_cred = {
                            loginUsername: $login_username.val(),
                            loginPassword: $login_password.val()
                        };

                        $.ajax({
                            type: 'POST',
                            url: 'http://www.lukeokane.com/login.php',
                            data: user_cred,
                            dataType: 'json',
                            success: function (data)
                                {
                                    if ((data[0].sess_id == "ERROR"))
                                        {
                                            $("#alert").fadeOut();

                                            $("#alert").addClass("alert alert-danger");
                                            $("#alert").empty();
                                            $("#alert").append("<b>ERROR:</b> Incorrect credentials.");
                                            $("#alert").fadeIn();
                                        } else if (data[0].bought == 1)
                                        {

                                            localStorage.setItem("sess_id", data[0].sess_id);
                                            sessionStorage.setItem("sess_id", data[0].sess_id);
                                            window.location = "users_courses.html";
                                        } else if (data[0].bought == 0)
                                        {
                                            sessionStorage.setItem("sess_id", data[0].sess_id);
                                            window.location = "purchase_courses.html";
                                        } else
                                        {
                                            $("#alert").fadeOut();

                                            $("#alert").addClass("alert alert-danger");
                                            $("#alert").empty();
                                            $("#alert").append("<b>ERROR:</b> Connection Error.");
                                            $("#alert").fadeIn();
                                        }




                                },
                            error: function ()
                                {
                                    $("#alert").fadeOut();

                                    $("#alert").addClass("alert alert-danger");
                                    $("#alert").empty();
                                    $("#alert").append("<b>ERROR:</b> Connection error.");
                                    $("#alert").fadeIn();
                                }

                        });
                        $("#alert").fadeOut();
                        $("#alert").empty();
                        $("#alert").removeClass();
                        $("#alert").addClass("alert alert-info");
                        $("#alert").append("<b>Waiting</b>...");
                        $("#alert").fadeIn();

                    });
    });
//    }