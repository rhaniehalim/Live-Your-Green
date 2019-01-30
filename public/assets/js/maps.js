var baseUrl = "http://api.earth911.com/";
var apiKey = "15fff0f9493d0bdc";


$("#userInput").on("submit", function (event) {
	event.preventDefault();
	$('.result-container').empty();

	var searchterm = $("#zipcode").val()

	if (!searchterm) {
		alert("Please enter your zipcode");
		return;
	}

	searchzip(searchterm);
	//console.log(searchterm);
	// $.get(baseUrl + "earth911.getPostalData?postal_code=" + searchterm + "&country=US&api_key=" + apiKey, function (response) {
	// 	var data = JSON.parse(response);
	// 	console.log(data)

	// 	$.get(baseUrl + "earth911.searchLocations?latitude=" + data.result.latitude + "&longitude=" + data.result.longitude + "&api_key=" + apiKey + "&max_results=10", function (response2) {
	// 		var data2 = JSON.parse(response2);
	// 		console.log(data2);

	// 		data2.result.forEach(function(result) {
	// 			$.get(baseUrl + "earth911.getLocationDetails?location_id=" + result.location_id + "&api_key=" + apiKey, function (response3) {
	// 				var data3 = JSON.parse(response3);
	// 				// console.log(data3.result[resultObj.location_id]);
	// 				var locationObj = data3.result[result.location_id];
	// 				console.log(locationObj);
	// 				var object = {
	// 					description: locationObj.description,
	// 					address: locationObj.address,
	// 					city: locationObj.city,
	// 					country: locationObj.country,
	// 				};

					// var container = $('<article>');
					// // container.css('padding', '15px');
					// var div1 = $(`<div>${ object.description }</div>`);
					// var div2 = $(`<div>${ object.address }</div>`);
					// var div3 = $(`<div>${ object.city }</div>`);
					// var div4 = $(`<div>${ object.country }</div>`);
					// container.append(div1);
					// container.append(div2);
					// container.append(div3);
					// container.append(div4);
					// $('.result-container').append(container)
				// });
			// });
		// });
	// });
});


function searchzip(zipcode) {
	$.post("/api/recycling", {
	  zipcode: zipcode
	}).then(function(data) {
	  console.log("hitting it?")
	  console.log(data);
	 //where we want the code to print to the page
	}).catch(function(err) {
		console.log("maps");
	  console.log(err.responseText);
	  $(".error").text(err.responseText);
	});
  }



		// http://api.earth911.com/earth911.getPostalData?api_key=15fff0f9493d0bdc;

		// https://www.google.com/search?q=earth911+api+how+to+use&rlz=1C5CHFA_enUS811US811&oq=earth&aqs=chrome.0.69i59j69i60l3j69i57j69i59.2014j0j7&sourceid=chrome&ie=UTF-8