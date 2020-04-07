var now = moment().format("LLL");
var APIKey = "9ceffc16572e37c6256c7430926365a7";

window.onload = function () {
  this.getCurrent('denver')
  this.populateHistoryList()
}

function getCurrent(findCity) {
  // Here we are building the URL we need to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + findCity + ",us&units=imperial&appid=" + APIKey;
  // We then created an AJAX call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $('#currentForecast').empty()
    imageString = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
    city = (`<p><h3>${findCity} ${now} <img src="${imageString}" alt="weatherIcon"></p>`)
    temp = (`<p>Temperature: ${response.main.temp}</p>`)
    humidity = (`<p>Humidity: ${response.main.humidity}</p>`)
    wind = (`<p>Wind: ${response.wind.speed}</p>`)
    $("#currentForecast").append(city, temp, humidity, wind)

    historyList(findCity)
    futureForecast(findCity)

  });

}
function futureForecast(findCity) {
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + findCity + ",us&units=imperial&appid=" + APIKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (results) {
    $('#futureForecast').empty()
    for (var i = 0; i < 14; i++) {
      if (i === 1 || i === 4 || i == 7 || i == 10 || i == 13) {
        newDiv = $('<div class="card">')
        divBody = $('<div class="card-body">')

        day = `<p>${results.list[i].dt_txt}</p>`
        icon = `http://openweathermap.org/img/wn/${results.list[i].weather[0].icon}.png`
        imageSting = (`<p><img src="${icon}" alt="weatherIcon"></p>`)
        temp = (`<p>Temperature: ${results.list[i].main.temp}</p>`)
        humidity = (`<p>Humidity: ${results.list[i].main.humidity}</p>`)
        divBody.append(day, imageSting, temp, humidity)
        newDiv.append(divBody)
        $('#futureForecast').append(newDiv)

      }
    }


  });
}

function historyList(city) {

  localStorage.setItem(city, city);
  populateHistoryList()

}
function populateHistoryList() {
  $('#historyList').empty()
  newList = $(' <div class="list-group" id="historyList">')
  for (var i = 0; i < localStorage.length; i++) {
    newList.append(`<button type="button" class="list-group-item list-group-item-action historyBtn" data-attr="${localStorage.key(i)}">${localStorage.key(i)}</button>`)

  }
  $('#historyList').append(newList)
}
$("#historyList ").on("click", ".historyBtn", function () {
  event.preventDefault()
  getCurrent($(this).attr("data-attr"))
  
})
$('#searchBtn').click(function () {
  event.preventDefault()
  var findCity = $('#citySearch').val().trim();

  getCurrent(findCity)
})
