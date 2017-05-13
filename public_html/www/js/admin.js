$(function ()
    {

        var userThumbnailTemplate = $('#thumbnail-template').html();
        var $thumbnails = $('.container');
        var session_id = sessionStorage.getItem('sess_id');
        function addUserThumbnails(data)
            {
                $thumbnails.append(Mustache.render(userThumbnailTemplate, data));
            }

        $.ajax({
            type: 'GET',
            url: 'http://www.lukeokane.com/get_all_languages.php',
            dataType: 'json',
            success: function (languages)
                {
                    $.each(languages, function (i, language)
                        {
                            addUserThumbnails(language);

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
                                                procesData: false,
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

                    $('.crededit').toggle();
                    $('.passedit').toggle();
                },
            error: function ()
                {
                    alert('error loading thumbnails');
                }
        });
         var $div = null;
        $thumbnails.delegate('.editCred', 'click', function ()
            {
                $div = $(this).closest('div');
                $div.find('input.cName').val($div.find('span.cName').html());
                $div.find('input.cSmallDesc').val($div.find('span.cSmallDesc').html());
                $div.find('input.cFullDesc').val($div.find('span.cFullDesc').html());
                $div.find('.crededit').toggle();
                $div.find('.noedit').toggle();
            });

        $thumbnails.delegate('.cancelCred', 'click', function ()
            {              
                $div.find('.crededit').toggle();
                $div.find('.noedit').toggle();
                if ($(".input-group").is(':visible'))
                    {
                        $div.find(".input-group").toggle();
                    }
            });

        $thumbnails.delegate('.saveCred', 'click', function ()
            {
                $cName = $div.find('#cName').val();
                $cSmallDesc = $div.find('#cSmallDesc').val();
                $cFullDesc = $div.find('#cFullDesc').val();
                $id = $(this).attr('data-id');
                var isValid = true;


                if (isValid == true)
                    {
                        var details = {
                            course_id: $id,
                            cName: $cName,
                            cSmallDesc: $cSmallDesc,
                            cFullDesc: $cFullDesc

                        };
//
//
                        $.ajax({
                            type: 'POST',
                            url: 'http://www.lukeokane.com/update_course_by_id.php',
                            data: details,
                            success: function (data)
                                {
                                    
                                    $div.find($("#alert").fadeIn());
                                    
                                    $div.find($("#alert").removeClass());
                                    $div.find($("#alert").empty());
                                    $div.find($("#alert").append("Profile edited <b>successfully</b>."));
                                    $div.find($("#alert").addClass("alert alert-success"));
                                    $div.find('.crededit').toggle();
                                    $div.find('.noedit').toggle();
                                    setTimeout(
                                            function ()
                                                {
                                                    $div.find($("#alert").fadeOut());
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

        $thumbnails.delegate('.editImage', 'click', function ()
            {
                $('.input-group').toggle();
            })
    });

