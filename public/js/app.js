$(document).ready(function() {

  $("#submitBtn").on("click", function (event) {
    event.preventDefault();

    var household_members = $('input[name=members]:checked').val();
    var home_size = $('input[name=home]:checked').val();
    var food_choice = $('input[name=food]:checked').val();
    var food_source = $("#foodQ").val();

    //grab the values from all the recycle items clicked and adds them together
    var recycleArray =  [];
    $("input[name=recycle]:checked").each(function () {
      if(this.checked){
        recycleArray.push($(this).val())
      };
    });
    
    recycleArray = recycleArray.reduce((a, b) => parseInt(a) + parseInt (b), 0);
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

           // Send the POST request.
           $.ajax("/footprints/", {
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
});