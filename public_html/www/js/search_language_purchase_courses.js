$('#search_bar').on("keyup", function ()
    {
       var thumbnailTemplate = $('#thumbnail-template').html();
    var $thumbnails = $('.container');
    function addThumbnails(data)
    {
        $thumbnails.append(Mustache.render(thumbnailTemplate, data));
    }

        var search_input = {
            search_input: $(this).val(),
            sess_id: window.sessionStorage.getItem("sess_id")
        };
        $.ajax({
            type: 'POST',
            url: 'http://www.lukeokane.com/language_search.php',
            data: search_input,
             dataType: 'json',
          success: function (languages) {
              $thumbnails.empty();
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
    
