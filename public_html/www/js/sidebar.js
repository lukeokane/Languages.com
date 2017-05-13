/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var session_id = sessionStorage.getItem('sess_id');
$(document).ready(function ()
    {
        var sess_id = {
            sess_id: session_id
        };
        $.ajax({
            type: 'POST',
            url: 'http://www.lukeokane.com/get_user_by_sess_id.php',
            dataType: 'json',
            data: sess_id,
            success: function (data)
                {
                    $("#sidebar_user_name").append(data[0].username);
                },
            error: function ()
                {
                    return "error connecting to database";
                }

        });
    });
var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;
trigger.click(function ()
    {
        hamburger_cross();
    });
function hamburger_cross()
    {

        if (isClosed == true)
            {
                overlay.hide();
                trigger.removeClass('is-open');
                trigger.addClass('is-closed');
                isClosed = false;
            } else
            {
                overlay.show();
                trigger.removeClass('is-closed');
                trigger.addClass('is-open');
                isClosed = true;
            }
    }

$('[data-toggle="offcanvas"]').click(function ()
    {
        $('#wrapper').toggleClass('toggled');
    });



        $(document).on("click", ".logout", function unlock_course()
            {
                event.preventDefault();
               
                var details = {
                    sess_id: session_id
                };

                 var href = $(this).attr('href');
                $.ajax({
                    type: 'POST',
                    url: 'http://www.lukeokane.com/logout.php',
                    data: details,
                    success: function ()
                        {
                            window.sessionStorage.removeItem('sess_id'); 
                            window.localStorage.removeItem('sess_id'); 
                               window.location.href = href;
                        },
                    error: function ()
                        {
                            alert('error loading thumbnails');
                        }
                });
            });



