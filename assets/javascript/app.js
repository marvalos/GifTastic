$(document).ready(function () {
    var movies = ["Toy Story", "Clueless", "Mean Girls", "The Dark Knight", "Reservoir Dogs", "A Goofy Movie", "Princess Mononoke", "Spirited Away"];

    // Adding buttons to original movies array
    function renderButtons() {
        $("#movie-buttons").empty();
        for (i = 0; i < movies.length; i++) {
            $("#movie-buttons").append("<button class='btn btn-success' data-movie='" + movies[i] + "'>" + movies[i] + "</button>");
        }
    }

    renderButtons();

    // Adding and pushing buttons
    $("#add-movie").on("click", function () {
        event.preventDefault();
        var movie = $("#movie-input").val().trim();
        console.log(movie);
        console.log(movies);
        movies.push(movie);
        renderButtons();
    });


    // Line 28 targets the success button on the newly loaded document that way the new buttons can fire.
    // Before, the new array was not the same array that could be targeted in the beginning
    $(document).on("click",".btn-success", function () {
        var movie = $(this).attr("data-movie");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            movie + "&api_key=lHPCQUFKQozGFV7MZVyMNQVZpNdlRSDp&limit=10"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            $("#movies").empty();
            for (var i = 0; i < results.length; i++) {
                var movieDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var movieImage = $("<img>");

                movieImage.attr("src", results[i].images.original_still.url);
                movieImage.attr("data-still", results[i].images.original_still.url);
                movieImage.attr("data-animate", results[i].images.original.url);
                movieImage.attr("data-state", "still");
                movieImage.attr("class", "gif");
                movieDiv.append(p);
                movieDiv.append(movieImage);
                $("#movies").append(movieDiv);
            }
        });
    });

    //Changes state of the GIF
    function playOrPause() {
        var state = $(this).attr("data-state");
        var playGIF = $(this).attr("data-animate");
        var pauseGIF = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", playGIF);
            $(this).attr("data-state", "animate");
        }

        else if (state == "animate") {
            $(this).attr("src", pauseGIF);
            $(this).attr("data-state", "still");
        }
    }

    $(document).on("click", ".gif", playOrPause);

});