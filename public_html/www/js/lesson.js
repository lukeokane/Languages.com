$(function () {
    
    var thumbnailTemplate = $('#thumbnail-template').html();
    var $thumbnails = $('#thumbnails');
    function addThumbnails(data)
    {
        $thumbnails.append(Mustache.render(thumbnailTemplate, data));
    }
        
    var sess_id = {
            id: window.sessionStorage.getItem("sess_id"),
        }
    
    $.ajax({
        type: 'POST',
        url: 'http://www.lukeokane.com/get_all_languages.php',
        dataType: 'json',
        data: sess_id,
        success: function (languages) {
            $.each(languages, function (i, language) {
                addThumbnails(language);
            });  
            
           
        },
        error: function() {
            alert('error loading thumbnails');
        }
    });
    
   $thumbnails.delegate('#more_info', 'click', function()
{
    $id = $(this).attr('data-id');
    window.sessionStorage.setItem("course_id", $id);
    window.location = "buy_page.html";
});
});