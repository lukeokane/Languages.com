$(document).ready(function ()
    {
        $(document).on("click", "#cancelbutton", function unlock_course()
            {
                history.go(-1);
                navigator.app.backHistory();
            });

        var thumbnailTemplate = $('#thumbnail-template').html();
        var $thumbnails = $('.container');
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
                                locale: 'EUR',
                                token: function (token)
                                    {
                                        var user_cred = {
                                            stripeToken: token.id,
                                            amount: (language.cPrice * 100),
                                            desc: "BOUGHT: " + language.cName                                        
                                        };

                                        $.ajax({
                                            type: 'POST',
                                            url: 'http://www.lukeokane.com/charge_user.php',
                                            data: user_cred,
                                            success: function (data)
                                                {
                                                    
                                                    var details = {
                                                        sess_id: window.sessionStorage.getItem("sess_id"),
                                                        course_id: window.sessionStorage.getItem("course_id")
                                                    };

                                                    $.ajax({
                                                        type: 'POST',
                                                        url: 'http://www.lukeokane.com/item_bought.php',
                                                        data: details,
                                                        success: function (data)
                                                            {

                                                                window.location = "users_courses.html";
                                                            },
                                                        error: function ()
                                                            {
                                                                return "error connecting to database";
                                                            }

                                                    });

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
                                        currency: 'EUR',
                                        amount: (language.cPrice * 100),
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


