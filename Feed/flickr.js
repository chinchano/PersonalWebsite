$(document).ready(function() {
 $('form').submit(function (evt){
  evt.preventDefault();             //submits form without going to a new page
  var userAnswer = $('#search');   //text field as ID of Search
  var submitButton = $('#submit');
  userAnswer.prop("disabled",true);  //cant type new text in text field
  submitButton.attr("disabled", true).val("searching..."); //changes value so user sees search
  
  // the AJAX part
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var animal = userAnswer.val();
    var flickrOptions = {
      tags: animal,
      format: "json"
    };
    function displayPhotos(data) {
      var photoHTML = '<ul>';
      $.each(data.items,function(i,photo) {
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      }); // end each
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
      userAnswer.prop("disabled", false);   //enabling the search again 
      submitButton.attr("disabled", false).val("Search"); //enabling the submit button again
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);

  }); // end click

});// end ready



// $('button').click(function () {
//    // highlight the button
//    // not AJAX, just cool looking
//    $("button").removeClass("selected");
//    $(this).addClass("selected");