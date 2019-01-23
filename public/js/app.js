$(document).ready(function() {

    var url = window.location.search;

    $("#submitBtn").on("click", function handleSurveySubmit(event) {
      event.preventDefault();

      var userInput = {
        household_members: $('input[name=members]:checked').val(),
        home_size: $('input[name=home]:checked').val(),
        food_choice: $('input[name=food]:checked').val(),
        food_source: $("#foodQ").val(),
        water_consump: $('input[name=water]:checked').val(),
        water_apps: $("#waterQ").val(),
        //water total: multiplies the water app value by water consumption
        purchases: $('input[name=purch]:checked').val(),
        waste: $('input[name=waste]:checked').val(),
        recycle: $("input[name=recycle]:checked").map(
            function() {return this.value;}).get().join(","), 
        //still need to add all of these values together   
        personal_vehicle: $('input[name=vehicle]:checked').val(),
        public_transportation: $('input[name=public]:checked').val(),
        air_travel: $('input[name=flight]:checked').val(),  
      };

      if (!userInput.val()) {
          return;
      }


      console.log('userInput = ' + JSON.stringify(userInput));

       // Send the POST request.
       $.ajax("/api/footprint/", {
        type: "POST",
        data: userInput
      }).then(
        function() {
          console.log("new user data submitted");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

    function submitSurvey()
});