/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getUserCred(id)
{
    $.ajax({
        type: 'POST',
        url: 'http://www.lukeokane.com/get_user_by_id.php',
        data: id,
        success: function(data) {
             return data;
             
          
        },
        error: function() {
              return "error connecting to database";
        }
        
    });
}


$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;
     
      var user_id = {
        user_id: localStorage.getItem("userName")   
    };
     
      

    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });  
});


