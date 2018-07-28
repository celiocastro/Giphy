var searchArray = ["Travel", "Sports", "Music", "Food", "Office"];

$(document).ready(function() {
    for (var i = 0; i < searchArray.length; i++) {
        $("#giphyButtons").append("<button type='button' onclick='searchGif(\"" + searchArray[i] + "\")' class='btn btn-primary' value=' " + searchArray[i] + "'> " + searchArray[i] + " </button>");
    }
});

function athleteButtonClicked() {
    var userInput = $('#giphy-input').val();
    searchGif(userInput);
}

function submitButtonClicked() {
    var userInput = $('#giphy-input').val();

    if (userInput) {
        $('#giphyButtons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=dc6zaTOxFJmzC',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

function displayGif(response) {
    $('#giphys').empty();
    for (var i = 0; i < response.data.length; i++) {
        var image = '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#giphys').append(image);
    }

    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}

