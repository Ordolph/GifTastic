let subjectArray = ["Solid Snake", "Ash Ketchum", "Gordon Freeman", "Chell", "Lara Croft", "Kratos", "Nathan Drake", "GLaDOS", "Samus", "Princess Zelda", "Link", "Mario", "Luigi", "Agent 47", "B.J. Blascowicz"];

let keyword;

let button = $('.btn');

function populateButtons() {

    for (i = 0; i < subjectArray.length; i++) {

        let newBtn = $("<button>");

        newBtn.text(subjectArray[i]).attr("class", "gifButton btn btn-primary");

        $('#buttons').append(newBtn);
    }

}



$(document).ready(function () {

    populateButtons()
    

    $('#searchButton').on("click", function (event) {

        event.preventDefault();

        let searchTerm = $('#searchTerm').val();

        if(subjectArray.indexOf(searchTerm) === -1 && searchTerm !== ""){

        $('#buttons').html("")


        $('#searchTerm').val("")

        console.log(searchTerm)

        subjectArray.push(searchTerm);

        populateButtons();
        }

        else if (searchTerm === ""){
            
        }

        else{
            alert("Try typing something new!")
        }

        
    })

    $(document).on("click", ".gifButton", function () {


        $('#gifs').html("");

        keyword = $(this).text();
        let queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=dBjrsDluEYZtWo5Oh0Ad80xdt7lFGtoF&q=" + keyword + "&limit=25&offset=0&rating=G&lang=en"



        console.log(this)
        $.ajax({
            url: queryUrl,
            method: "GET",
        })
            .then(function (response) {
                var results = response.data;

                for (i = 0; i < results.length; i++) {

                    let gifDiv = $('<div>');
                    let rating = results[i].rating;
                    let p = $('<p>').text("Rating: " + rating);
                    let gif = $('<img>').attr("src", results[i].images.fixed_height.url);

                    gifDiv.prepend(p);
                    gifDiv.prepend(gif);

                    $("#gifs").prepend(gifDiv);


                }




            });

    })
});
