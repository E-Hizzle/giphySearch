var subjects = ['Super Mario', 'Megaman', 'Yoshi', 'Pikachu', 'Charmander', 'Master Chief', 'Kirby'];
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + subjects + "&api_key=dc6zaTOxFJmzC";

$(document).ready(function(){

  function newButton(subject){
    var a = $('<button>')
    a.addClass('subject');
    a.attr('data-name', subject);
    a.text(subject);
    $('#buttonsView').append(a);
  }

  function renderButtons(){
    for (var i = 0; i < subjects.length; i++){
      newButton(subjects[i])
    }
  }

  function displayGifThings(){
    var p = $(this).data('name');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response){
        var results = response.data;

        for (var i = 0; i < results.length; i++){
          var gifDiv = $('<div class="item">')

          var rating = results[i].rating;

          var p = $('<p>').text("Rating: " + rating);

          var gifImage = $('<img>');
          gifImage.attr('src', results[i].images.fixed_height.url);

          gifDiv.append(p)
          gifDiv.append(gifImage)

          $('#gifsAppearHere').prepend(gifDiv);
        }
    });
  };

  renderButtons();

  $('#addSubject').on('click', function(){
    var subject = $('#subject-input').val().trim();
    subjects.push(subject);
    newButton(subject);
    return false;
  });
  $(document).on('click', '.subject', displayGifThings);
});

