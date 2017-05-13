$(function () {
    
    var thumbnailTemplate = $('#thumbnail-template').html();
    var $thumbnails = $('#thumbnails');
    function addThumbnails(data)
    {
        $thumbnails.append(Mustache.render(thumbnailTemplate, data));
    }
    
    $.ajax({
        type: 'GET',
        url: 'http://www.lukeokane.com/get_all_languages.php',
        dataType: 'json',
        success: function (languages) {
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