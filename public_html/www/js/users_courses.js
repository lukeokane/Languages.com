$(function ()
    {

        var coursesThumbnailTemplate = $('#courses_thumbnail_template').html();
        var lessonsThumbnailTemplate = $('#lessons_thumbnail_template').html();
        var $thumbnails = $('.container');
        var session_id = sessionStorage.getItem('sess_id');
        var course_id = sessionStorage.getItem('course_id');
        var course_chosen = sessionStorage.getItem("course_chosen");
        function addCourseThumbnails(data)
            {
                $thumbnails.append(Mustache.render(coursesThumbnailTemplate, data));
            }

        function addLessonThumbnails(data)
            {
                $thumbnails.append(Mustache.render(lessonsThumbnailTemplate, data));
            }

        var sess_id = {
            sess_id: session_id
        };

        $.ajax({
            type: 'POST',
            url: 'http://www.lukeokane.com/get_user_courses_by_sess_id.php',
            dataType: 'json',
            data: sess_id,
            success: function (languages)
                {
                    if (jQuery.isEmptyObject(languages) == true)
                        {
                            $("#current_lesson_alert").addClass("alert alert-info");
                            $("#current_lesson_alert").append("You own no courses, why not buy some?");
                        }
                        else{
                                                $.each(languages, function (i, language)
                        {
                            addCourseThumbnails(language);
                        });
                        }


                },
            error: function ()
                {
                    alert('error loading thumbnails');
                }
        });

        $thumbnails.delegate('#course_chosen', 'click', function ()
            {
                $id = $(this).attr('data-id');


                var details = {
                    course_id: $id,
                    sess_id: session_id
                };


                $.ajax({
                    type: 'POST',
                    url: 'http://www.lukeokane.com/check_if_course_locked.php',
                    dataType: 'json',
                    data: details,
                    success: function (data)
                        {
                            if (data[0].result == 1)
                                {

                                    if (data[0].sess_id == session_id)
                                        {
                                            var details = {
                                                course_id: $id,
                                                 sess_id: session_id
                                            };

                                            $.ajax({
                                                type: 'POST',
                                                url: 'http://www.lukeokane.com/get_course_lessons.php',
                                                dataType: 'json',
                                                data: details,
                                                success: function (languages)
                                                    {

                                                        $("#search_bar_div").removeClass();
                                                        $("#search_bar_div").addClass("form-group has-feedback hidden");
                                                        $("#current_lesson_alert").removeClass();
                                                        $("#current_lesson_alert").addClass("alert alert-info");
                                                        $("#current_lesson_alert").append("You are on lesson: ", languages[0].current_lesson);
                                                        $thumbnails.empty();
                                                        $.each(languages, function (i, language)
                                                            {
                                                                addLessonThumbnails(language);
                                                            });

                                                    },
                                                error: function ()
                                                    {
                                                        alert('error loading thumbnails');
                                                    }
                                            });
                                        } else
                                        {
                                            alert('Course is in use by another device');
                                        }
                                } else
                                {
                                    var details = {
                                        course_id: $id,
                                        sess_id: session_id
                                    };


                                    $.ajax({
                                        type: 'POST',
                                        url: 'http://www.lukeokane.com/lock_course.php',
                                        dataType: 'json',
                                        data: details,
                                        success: function (languages)
                                            {
                                                sessionStorage.setItem("course_chosen", $id);
                                                course_chosen = sessionStorage.getItem("course_chosen");
                                                var details = {
                                                    course_id: course_chosen,
                                                     sess_id: session_id
                                                };


                                                $.ajax({
                                                    type: 'POST',
                                                    url: 'http://www.lukeokane.com/get_course_lessons.php',
                                                    dataType: 'json',
                                                    data: details,
                                                    success: function (languages)
                                                        {
                                                            $("#search_bar_div").removeClass();
                                                            $("#search_bar_div").addClass("form-group has-feedback hidden");
                                                            $("#current_lesson_alert").removeClass();
                                                            $("#current_lesson_alert").addClass("alert alert-info");
                                                            $("#current_lesson_alert").append("You are on lesson: ", languages[0].current_lesson);
                                                            $thumbnails.empty();
                                                            $.each(languages, function (i, language)
                                                                {
                                                                    addLessonThumbnails(language);
                                                                });
                                                        },
                                                    error: function ()
                                                        {
                                                            alert('error loading thumbnails');
                                                        }
                                                });

                                            },
                                        error: function ()
                                            {
                                                alert('error loading thumbnails');
                                            }
                                    });
                                }


                        }
                });
            });

        $thumbnails.delegate('#lesson_chosen', 'click', function ()
            {
                $id = $(this).attr('data-id');

                var details = {
                    course_id: sessionStorage.getItem("course_chosen"),
                    sess_id: session_id,
                    lesson_id: $id
                };


                $.ajax({
                    type: 'POST',
                    url: 'http://www.lukeokane.com/update_current_lesson.php',
                    data: details,
                    success: function ()
                        {
                            alert('Lesson entered.');
                        },
                    error: function ()
                        {
                            alert('error loading thumbnails');
                        }
                });
            });


        $(document).on("click", "a", function unlock_course()
            {
                event.preventDefault();
                var details = {
                    course_id: course_chosen,
                    sess_id: session_id
                };

                var href = $(this).attr('href');
                $.ajax({
                    type: 'POST',
                    url: 'http://www.lukeokane.com/unlock_course.php',
                    data: details,
                    success: function ()
                        {
                            window.sessionStorage.removeItem('course_chosen');
                            window.location.href = href;
                        },
                    error: function ()
                        {
                            alert('error loading thumbnails');
                        }
                });
            });

    });