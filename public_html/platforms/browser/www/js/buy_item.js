
function item_bought(sess_id, course_id)
{
    var details = {
            sess_id: sess_id,
            course_id: course_id
        };
        
    $.ajax({
        type: 'POST',
        url: 'http://www.lukeokane.com/item_bought.php',
        data: details,
        success: function(data) {
//             return data;
             alert(data);
             
          
        },
        error: function() {
              return "error connecting to database";
        }
        
    });
}

$(document).ready(function ()
    {
        var thumbnailTemplate = $('#thumbnail-template').html();
        var $thumbnails = $('#thumbnails');
        function addThumbnails(data)
            {
                $thumbnails.append(Mustache.render(thumbnailTemplate, data));
            }

        var search_input = {
            course_id: window.sessionStorage.getItem("course_id")
        };
        $.ajax({
            type: 'POST',
            url: 'http://www.lukeokane.com/get_course_by_id.php',
            data: search_input,
            dataType: 'json',
            success: function (languages)
                {
//              $thumbnails.empty();
                    $.each(languages, function (i, language)
                        {
                            addThumbnails(language);

                            var handler = StripeCheckout.configure({
                                key: 'pk_test_HQq7SGEUfWjeNH27Sl6Sq3F4',
                                image: 'images/iconoriginal.png',
                                locale: 'auto',
                                token: function (token)
                                    {
                                        alert(token.id);
                                        var user_cred = {
                                            stripeToken: token.id
                                        };

                                        $.ajax({
                                            type: 'POST',
                                            url: 'http://www.lukeokane.com/charge_user.php',
                                            data: user_cred,
                                            success: function (data)
                                                {
                                                    alert(window.sessionStorage.getItem("course_id"));
                                                  item_bought(window.sessionStorage.getItem("sess_id"), window.sessionStorage.getItem("course_id"));
                                                  localStorage.setItem("sess_id", window.sessionStorage.getItem("sess_id"));

                                                },
                                            error: function ()
                                                {
                                                    alert('transaction error');
                                                }

                                        });
                                    }
                            });

                            document.getElementById('confirm_purchase').addEventListener('click', function (e)
                                {
                                    // Open Checkout with further options:
                                    handler.open({
                                        name: 'Languages.com',
                                        description: 'Course Purchase: ' + language.cName,
                                        zipCode: false,
                                        email: ' ',
                                        amount: language.cPrice,
                                        allowRememberMe: false
                                    });
                                    e.preventDefault();
                                });

// Close Checkout on page navigation:
                            window.addEventListener('popstate', function ()
                                {
                                    handler.close();
                                });
                        });


                },
            error: function ()
                {
                    alert('error');
                }

        });
    });


