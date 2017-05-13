$(function ()
    {

        var session_id = window.sessionStorage.getItem('sess_id');
        var userThumbnailTemplate = $('#user_thumbnail_template').html();
        var $thumbnails = $('#thumbnails');
        var session_id = sessionStorage.getItem('sess_id');
        function addUserThumbnails(data)
            {
                $thumbnails.append(Mustache.render(userThumbnailTemplate, data));
            }


        var sess_id = {
            sess_id: session_id
        };

        $.ajax({
            type: 'POST',
            url: 'http://www.lukeokane.com/get_user_by_sess_id.php',
            dataType: 'json',
            data: sess_id,
            success: function (languages)
                {
                    $.each(languages, function (i, language)
                        {
                            addUserThumbnails(language);
                            $('.crededit').toggle();
                            $('.passedit').toggle();
                            $('.input-group').toggle();
                            $(document).on('click', '#close-preview', function ()
                                {
                                    $('.image-preview').popover('hide');
                                    // Hover befor close the preview
                                    $('.image-preview').hover(
                                            function ()
                                                {
                                                    $('.image-preview').popover('show');
                                                },
                                            function ()
                                                {
                                                    $('.image-preview').popover('hide');
                                                }
                                    );
                                });

                            $(function ()
                                {
                                    // Create the close button
                                    var closebtn = $('<button/>', {
                                        type: "button",
                                        text: 'x',
                                        id: 'close-preview',
                                        style: 'font-size: initial;',
                                    });
                                    closebtn.attr("class", "close pull-right");
                                    // Set the popover default content
                                    $('.image-preview').popover({
                                        trigger: 'manual',
                                        html: true,
                                        title: "<strong>Preview</strong>" + $(closebtn)[0].outerHTML,
                                        content: "There's no image",
                                        placement: 'bottom'
                                    });
                                    // Clear event
                                    $('.image-preview-clear').click(function ()
                                        {
                                            $('.image-preview').attr("data-content", "").popover('hide');
                                            var image_name = $('.image-preview-filename').val();
                                            $('.image-preview-filename').val("");
                     
                                            $('.image-preview-clear').hide();
                                            $('.image-preview-input input:file').val();
                                            $(".image-preview-input-title").text("Browse");

                                            var session_id = window.sessionStorage.getItem('sess_id');
                                            
                                            

                                            var details = {
                                                sess_id: session_id,
                                                image_name: image_name,
                                                image_content: image_content
                                            };

                                            $.ajax({
                                                type: 'POST',
                                                url: 'http://www.lukeokane.com/upload_image.php',
                                                data: details,
                                                contentType: false,
                                                procesData:false,
                                                success: function ()
                                                    {
//             return data;                             
                                                      alert('updated');


                                                    },
                                                error: function ()
                                                    {
                                                        return "error connecting to database";
                                                    }

                                            });
                                        });
                                    // Create the preview image
                                    $(".image-preview-input input:file").change(function ()
                                        {
                                            var img = $('<img/>', {
                                                id: 'dynamic',
                                                width: 250,
                                                height: 200
                                            });
                                            var file = this.files[0];
                                            var reader = new FileReader();
                                            // Set preview image into the popover data-content
                                            reader.onload = function (e)
                                                {
                                                    $(".image-preview-input-title").text("Change");
                                                    $(".image-preview-clear").show();
                                                    $(".image-preview-filename").val(file.name);
                                                    img.attr('src', e.target.result);
                                                    $(".image-preview").attr("data-content", $(img)[0].outerHTML).popover("show");
                                                }
                                            reader.readAsDataURL(file);
                                        });
                                });
                        });


                },
            error: function ()
                {
                    alert('error loading thumbnails');
                }
        });

        $thumbnails.delegate('.editCred', 'click', function ()
            {
                var $div = $(this).closest('div');
                $div.find('input.email').val($div.find('span.email').html());
                $('.crededit').toggle();
                $('.noedit').toggle();
            })

        $thumbnails.delegate('.cancelCred', 'click', function ()
            {
                $('.crededit').toggle();
                $('.noedit').toggle();
                if ($(".input-group").is(':visible'))
                    {
                        $(".input-group").toggle();
                    }
            });

        $thumbnails.delegate('.saveCred', 'click', function ()
            {
                var isValid = true;
                function isValidEmailAddress(emailAddress)
                    {
                        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
                        return pattern.test(emailAddress);
                    }

                var email = $("#email").val();

                $("#alert").empty();
                if (email == "")
                    {
                        $("#alert").append("Email field is required. ");
                        isValid = false;
                    } else
                    {
                        $("#alert").append("");
                        if (email.length < 4 || email.length > 50)
                            {
                                $("#alert").append("Email: 4 to 50 characters required. ");
                                isValid = false;
                            } else
                            {
                                $("#alert").append("");
                                if (isValidEmailAddress(email) == false)
                                    {
                                        $("#alert").append("Invalid email address (e.g luke@gmail.com).");
                                        isValid = false;
                                    } else
                                    {
                                        $("#alert").append("");
                                    }
                            }
                    }

                if (isValid == true)
                    {
                        var $div = $(this).closest('input');
                        var details = {
                            email: email,
                            sess_id: session_id
                        };
//
//
                        $.ajax({
                            type: 'POST',
                            url: 'http://www.lukeokane.com/update_user_by_sess_id.php',
                            data: details,
                            success: function ()
                                {
                                    $("#alert").removeClass();
                                    $("#alert").empty();
                                    $("#alert").append("Profile edited <b>successfully</b>.")
                                    $("#alert").addClass("alert alert-success");
                                    $('.crededit').toggle();
                                    $('.noedit').toggle();
                                    setTimeout(
                                            function ()
                                                {
                                                    $("#alert").fadeOut();
                                                }, 5000);
                                },
                            error: function ()
                                {
                                    $("#alert").removeClass();
                                    $("#alert").empty();
                                    $("#alert").append("Profile edited successfully.")
                                    $("#alert").addClass("alert alert-danger");
                                }
                        });
                    } else
                    {
                        $("#alert").removeClass();
                        $("#alert").addClass("alert alert-warning");
                    }

            });

        $thumbnails.delegate('.editPass', 'click', function ()
            {
                var $div = $(this).closest('div');
                $div.find('input.email').val($div.find('span.email').html());
                $('.passedit').toggle();
                $('.noedit').toggle();
            });

        $thumbnails.delegate('.cancelPass', 'click', function ()
            {
                $('.passedit').toggle();
                $('.noedit').toggle();
            });

        $thumbnails.delegate('.savePass', 'click', function ()
            {
                var isValid = true;
                function isValidPassword(string)
                    {
                        var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
                        return regex.test(string);
                    }
                var newPass = $("#newPass").val();
                var currentPassInput = $("#currentPassInput").val();
                $("#alert").empty();
                if (newPass == "")
                    {
                        $("#alert").append("New password field is required.");
                        isValid = false;
                    } else
                    {
                        $("#alert").append("");
                        if (isValidPassword(newPass) == false)
                            {
                                $("#alert").append("New password must be at least 8 chars, including a number, uppercase letter and a special character.");
                                isValid = false;
                            } else
                            {
                                $("#alert").append("");
                            }
                    }

                if (isValid == true)
                    {
                        var $div = $(this).closest('input');
                        var details = {
                            sess_id: session_id,
                            currentPassInput: currentPassInput,
                            newPass: newPass
                        };
//
//
                        $.ajax({
                            type: 'POST',
                            url: 'http://www.lukeokane.com/change_password.php',
                            data: details,
                            success: function (result)
                                {
                                    if (result == 1)
                                        {
                                            $("#alert").removeClass();
                                            $("#alert").empty();
                                            $("#alert").append("Password changed <b>successfully</b>.")
                                            $("#alert").addClass("alert alert-success");
                                            $("#alert").fadeIn();
                                            $('.passedit').toggle();
                                            $('.noedit').toggle();
                                            setTimeout(
                                                    function ()
                                                        {
                                                            $("#alert").fadeOut();
                                                        }, 5000);
                                        } else
                                        {
                                            $("#alert").removeClass();
                                            $("#alert").empty();
                                            $("#alert").append("Incorrect <b>password</b>.")
                                            $("#alert").fadeOut();
                                            $("#alert").addClass("alert alert-danger");
                                            $("#alert").fadeIn();
                                        }
                                },
                            error: function ()
                                {
                                    $("#alert").removeClass();
                                    $("#alert").empty();
                                    $("#alert").append("Error encountered.")
                                    $("#alert").addClass("alert alert-danger");
                                }
                        });
                    } else
                    {
                        $("#alert").removeClass();
                        $("#alert").addClass("alert alert-warning");
                    }


            });
        $thumbnails.delegate('.editImage', 'click', function ()
            {
                $('.input-group').toggle();
            })
    });

