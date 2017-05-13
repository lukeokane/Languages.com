$('#search_bar').on("keyup", function ()
    {
       var thumbnailTemplate = $('#thumbnail-template').html();
    var $thumbnails = $('#thumbnails');
    function addThumbnails(data)
    {
        $thumbnails.append(Mustache.render(thumbnailTemplate, data));
    }

        var search_input = {
            search_input: $(this).val()
        };
        $.ajax({
            type: 'POST',
            url: 'http://www.lukeokane.com/language_search.php',
            data: search_input,
             dataType: 'json',
          success: function (languages) {
            $.each(languages, function (i, language) {
                addThumbnails(language);
            });
        },
            error: function ()
                {
                  alert('error');
                }
        });
    });
    
