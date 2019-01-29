$(document).ready(function () {

  $("#submitBtn").on("click", function (event) {
    event.preventDefault();

    var household_members = $('input[name=members]:checked').val();
    var home_size = $('input[name=home]:checked').val();
    var food_choice = $('input[name=food]:checked').val();
    var food_source = $("#foodQ").val();

    //grab the values from all the recycle items clicked and adds them together
    var recycleArray = [];
    $("input[name=recycle]:checked").each(function () {
      if (this.checked) {
        recycleArray.push($(this).val())
      };
    });

    recycleArray = recycleArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    console.log(recycleArray);

    //multiply the two water values together
    var waterTotal = $('input[name=water]:checked').val() * $("#waterQ").val()
    console.log(waterTotal);

    var purchases = $('input[name=purch]:checked').val();
    var waste = $('input[name=waste]:checked').val();
    var personal_vehicle = $('input[name=vehicle]:checked').val();
    var public_transportation = $('input[name=public]:checked').val();
    var air_travel = $('input[name=flight]:checked').val();

    var totalFootprint = (parseInt(household_members) + parseInt(home_size) + parseInt(food_choice) + parseInt(food_source) +
      waterTotal + parseInt(purchases) + parseInt(waste) + recycleArray + parseInt(personal_vehicle) +
      parseInt(public_transportation) + parseInt(air_travel));

    var userInput = {
      household_members: household_members,
      home_size: home_size,
      food_choice: food_choice,
      food_source: food_source,
      waterTotal: waterTotal,
      purchases: purchases,
      waste: waste,
      recycle: recycleArray,
      personal_vehicle: personal_vehicle,
      public_transportation: public_transportation,
      air_travel: air_travel,
      totalFootprint: totalFootprint
    };

    console.log('userInput = ' + JSON.stringify(userInput));
    console.log('total footprint =' + totalFootprint);

    if (isNaN(totalFootprint)) {
      alert("Please complete all questions in the survey! Thanks!");
    } else {
      // If we have a number for total footprint 
      var userid = localStorage.getItem("id");
      console.log("local storage id", localStorage.getItem("id"));

      sendSurvey(userid, userInput.household_members, userInput.home_size, userInput.food_choice, userInput.food_source,
        userInput.waterTotal, userInput.purchases, userInput.waste, userInput.recycle, userInput.personal_vehicle,
        userInput.public_transportation, userInput.air_travel, userInput.totalFootprint);
    };


    

    // Send the POST request.
    function sendSurvey(userid, household_members, home_size, food_choice, food_source, waterTotal, purchases, waste, recycleArray, personal_vehicle, public_transportation, air_travel, totalFootprint) {
      $.post("/api/footprints", {
        UserId: userid,
        household_members: household_members,
        home_size: home_size,
        food_choice: food_choice,
        food_source: food_source,
        waterTotal: waterTotal,
        purchases: purchases,
        waste: waste,
        recycle: recycleArray,
        personal_vehicle: personal_vehicle,
        public_transportation: public_transportation,
        air_travel: air_travel,
        totalFootprint: totalFootprint
      })
        .then(function (data) {
          // window.location.replace(data);

          $('#myModal').on('show.bs.modal', function (e) {
            if (!data) return e.preventDefault() // stops modal from being shown

            else if (data.totalFootprint <= 60) {
              $("#matchInfo").empty();
              var matchName = $("<p>").html("<strong>" + data.totalFootprint + "<strong>");
              $("#matchInfo").append(matchName);
              var message = $("<p>").html("Congratulations! The average consumer has a footprint value of 60. Check out our resources for new ideas to keep living your green.");
              $("#matchInfo").append(message);
            }
            else if (data.totalFootprint > 60) {
              $("#matchInfo").empty();
              var matchName = $("<p>").html("<strong>" + data.totalFootprint + "<strong>");
              $("#matchInfo").append(matchName);
              var message = $("<p>").html("The average consumer has a footprint value of 60. Check out our resources to find easy ways to reduce your carbon footprint and start living your green.");
              $("#matchInfo").append(message);
            }


          });
          //this calls the modal to pop up
          $('#myModal').modal('show')
          //reloads the page when the modal is dismissed
          $('#myModal').on('hidden.bs.modal', function (e) {
            location.reload()
          })
          // If there's an error, handle it by throwing up a bootstrap alert
        })
      // .catch(function (err) {
      //   res.json(err);
      //   console.log(err);
      // });
    };
  });
});