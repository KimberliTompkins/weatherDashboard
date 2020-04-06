var now = moment().format("LLL");
var APIKey = "9ceffc16572e37c6256c7430926365a7";

$('#searchBtn').click(function(){
     
  var findCity = $('#citySearch').val().trim();

  // Here we are building the URL we need to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+findCity+",us&units=imperial&appid=" + APIKey;
  // We then created an AJAX call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
     imageString = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
     city = (`<p><h3>${findCity} ${now} <img src="${imageString}" alt="weatherIcon"></p>`)
     temp = (`<p>Temperature: ${response.main.temp}</p>`)
     humidity = (`<p>Humidity: ${response.main.humidity}</p>`)
     wind = (`<p>Wind: ${response.wind.speed}</p>`)
     $("#currentForecast").append(city,temp,humidity,wind)
    futureForecast(findCity)

  });

})

function futureForecast(findCity)
{
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+findCity+",us&units=imperial&appid=" + APIKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(results) {
   
    for (var i = 0; i< 5;i++){
      day = `<p>${results.list[i].dt_txt}</p>`
      icon =  `http://openweathermap.org/img/wn/${results.list[i].weather[0].icon}.png`
      imageSting =  (`<p><img src="${icon}" alt="weatherIcon"></p>`)
      temp = (`<p>Temperature: ${results.list[i].main.temp}</p>`)
      humidity = (`<p>Humidity: ${results.list[i].main.humidity}</p>`)
      addTo = '#day'+i
      $(addTo).append(day,imageSting ,temp,humidity)
    
    }
    
    console.log(results)

  });
}