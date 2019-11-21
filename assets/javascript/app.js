$(document).ready(function() {
  //Variables defined
  var animalArray = ["dog","cat","bird"];
  var animalButtonClickable;
  var newAnimal;
  var animal;
  var queryURL;
  var results;
  var dataAnimate;
  var dataStill;
  var gifDiv;
  var rating;
  var p;
  var animalGif;
  
  //function for creating animal buttons
  function renderButtons() {
    console.log(animalArray);
    // Deleting the animal buttons prior to adding new animal buttons
    $("#animalButtons").empty();
    // Looping through the array of animalArray
    for (var i = 0; i < animalArray.length; i++) {
    // generate buttons for each animal in the array
    var animalButtonClickable = $("<button>");
    // Adding a class
    animalButtonClickable.addClass("animalClass");
    // Adding a data-attribute with a value of the animal at index i
    animalButtonClickable.attr("data-animals", animalArray[i]);
    // Providing the button's text with a value of the animal at index i
    animalButtonClickable.text(animalArray[i]);
    // Adding the button to the HTML
    $("#animalButtons").append(animalButtonClickable);
    }
  }
    //adding animals to buttons arranged at top of HTML
    $("#addAnimal").on("click",function(event) {
        // this event.preventDefault() is supposed to eliminate multiple clicks - but I am getting extra clicks after first new animal added
    event.preventDefault();
    var newAnimal = $("#animalInput").val().trim();
    animalArray.push(newAnimal);
    //clear textbox
    $("#animalInput").val("");
    renderButtons();
      });
      $("#animalButtons").on("click", ".animalClass", function(event){
      event.preventDefault();
      $("#gifDisplayed").empty();
      var animal = $(this).attr("data-animals");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=kkU3m1nmWSleZQzXM7rEOfj0nijmPAdi&limit=10";
       // Performing  AJAX GET request
   $.ajax({
     url: queryURL,
     method: "GET"
   })
   .then(function(response){
   // Storing an array of results in the results variable
     var results = response.data;
     // Looping over every result item
     for (var i = 0; i < results.length; i++) {
     //setting variables for still and animated url's
     var dataAnimate = results[i].images.fixed_height.url;
     var dataStill = results[i].images.fixed_height_still.url;
    
          //creating new div
          var gifDiv = $("<div>");
          //add class to the new div
          gifDiv.addClass("animalGif");
          //adding animal video rating 
          var rating = results[i].rating;
          //adding p tag with rating
          var p = $("<p>").text("Rating: " + rating);
          //creating new image tag
          var animalGif = $("<img>");
          //add class
          animalGif.addClass("animalImageClickable");
          //adding attributes for start/stop animation on button click
          animalGif.attr("data-still", dataStill);
          animalGif.attr("data-animated", dataAnimate);
          animalGif.attr("data-state", "still");
          //adding source to image tag of the animal url
          animalGif.attr("src", dataAnimate);
          //printing animal rating and gif to html
          gifDiv.append(p);
          gifDiv.append(animalGif);
          $("#gifDisplayed").append(gifDiv);
          }
          //creating click event to change from animated to still image
        $(".animalImageClickable").on("click", function(){
          var state = $(this).attr("data-state");
              if (state === "still") {
              $(this).attr("src", $(this).attr("data-animated"));
              $(this).attr("data-state", "animate");
              } 
              else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
            });
   });
   });

   renderButtons();
});




