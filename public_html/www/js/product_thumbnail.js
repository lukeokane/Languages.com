$(function () {
    
    var thumbnailTemplate = $('#thumbnail-template').html();
    var $thumbnails = $('.container');
    function addThumbnails(data)
    {
        $thumbnails.append(Mustache.render(thumbnailTemplate, data));
    }
    var sess_id = {
                            sess_id: window.sessionStorage.getItem("sess_id")
                        };
    
    $.ajax({
        type: 'POST',
        url: 'http://www.lukeokane.com/get_courses_not_bought.php',
        dataType: 'json',
        data: sess_id,
        success: function (languages) {
                                if (jQuery.isEmptyObject(languages) == true)
                        {
                            $(".container").append("You own all of the courses, we create more courses each week so stay tuned! :)");
                        }
            $.each(languages, function (i, language) {
                addThumbnails(language);
            });        
        },
        error: function() {
            alert('error');
        }
    });
    
   $thumbnails.delegate('#more_info', 'click', function()
{
    $id = $(this).attr('data-id');
    window.sessionStorage.setItem("course_id", $id);
    window.location = "buy_page.html";
});
});