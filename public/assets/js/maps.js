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
});


function searchzip(zipcode) {
	$.post("/api/recycling", {
	  zipcode: zipcode
	}).then(function(data) {
	  console.log(data);
		$('.result-container').empty()
		for (let i = 0; i < data.length; i++) {
			  var container = $('<div class = "eachresult">');
				var div1 = $(`<div>${ data[i].description }</div>`);
				var div2 = $(`<div>${ data[i].address }</div>`);
				var div3 = $(`<div>${ data[i].city }</div>`);
				var div4 = $(`<div>${ data[i].country }</div>`);
				container.append(div1);
				container.append(div2);
				container.append(div3);
				container.append(div4);
				$('.result-container').append(container)
		}
	
	}).catch(function(err) {
		console.log("maps");
	  console.log(err.responseText);
	  $(".error").text(err.responseText);
	});
  }



		// http://api.earth911.com/earth911.getPostalData?api_key=15fff0f9493d0bdc;

		// https://www.google.com/search?q=earth911+api+how+to+use&rlz=1C5CHFA_enUS811US811&oq=earth&aqs=chrome.0.69i59j69i60l3j69i57j69i59.2014j0j7&sourceid=chrome&ie=UTF-8
