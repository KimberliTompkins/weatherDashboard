var now = moment().format("LLL");
var apiKey = '9ceffc16572e37c6256c7430926365a7';

$('#searchBtn').click(function(){
     
  var findCity = $('#citySearch').val().trim();
   
  var APIKey = "9ceffc16572e37c6256c7430926365a7";

  // Here we are building the URL we need to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+findCity+",us&units=imperial&appid=" + APIKey;

  // We then created an AJAX call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    
     city = (`<p><h3>${findCity} ${now}</p>`)
     temp = (`<p>Temerature: ${response.main.temp}</p>`)
     humidity = (`<p>Humidity: ${response.main.humidity}</p>`)
     wind = (`<p>Wind: ${response.wind.speed}</p>`)
     $("#currentForecast").append(city,temp,humidity,wind)
  console.log(response)

    // Create CODE HERE to transfer content to HTML
    // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
    // Create CODE HERE to dump the temperature content into HTML

  });

})

