// Variable define the weather key is stored in local storage as weatherAPI
const API = localStorage.getItem('weatherAPI');
const coordinates = {};
const currentWeather = {};
const fiveDayWeather = [];
const itemList = [];
const userSubmitBtn = $('#submitBtn');
const cityInputEl = $('#cityInput');
const userInputEl = $('#userInput');


function geoCodeFetch (city, state){
   fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},USA&limit=5&appid=${API}`)
  .then((response) => response.json())
  .then((data) => {
    coordinates.lat = data[0].lat;
    coordinates.lon = data[0].lon;
    console.log(data);
  })
}

function currentWeatherFetch (lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`)
 .then((response) => response.json())
 .then((data) => {
  currentWeather.weatherDescrip = data.weather[0].description;
  currentWeather.temperature = data.main.temp;
  currentWeather.maxTemp = data.main.temp_max;
  currentWeather.minTemp = data.main.temp_min;
  currentWeather.humidity = data.main.humidity;
  currentWeather.pressure = data.main.pressure;
  currentWeather.speed = data.wind.speed;
  currentWeather.windDeg = data.wind.deg;
 }); 
}

function fiveDayFetch (lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API}`)
 .then((response) => response.json())
 .then((data) => {
  for (i=0; i < data.list.length; i++){
    fiveDayWeather[i] = data.list[i];
  }});
 }

// for (i=0; i < cityData.length; i++) {
//   cityList[i] = cityData[i].City;
// }
// City list is just the city names taken out of the cityData array this is used for autocomplete and indexing in the object array.
// jquery autocomplete UI
//  $("#cityInput").autocomplete({
//   source : cityList 
// })

// for (i=0; i < cityData.length; i++) {
//   $('#cityTable').append(
//     `
//     <tr>
//     <td>${cityData[i].City}</td>
//     <td>${cityData[i].State}</td>
//     </tr>
//     `
//   )
// }



userSubmitBtn.on('click', function(event){
  // event.preventDefault();
  $('#cityTable').empty();

  $('#cityTable').append(`
              <tr class="tableHeader">
              <th style="width :60%">City</th>
              <th style="width :25%">State</th>
              </tr>
  `);

  let i = 0;
  cityData.forEach(element => {
    let inputTemp = userInputEl.val().toLowerCase();
    let cityTemp = element.City.toLowerCase();
    if (cityTemp.indexOf(`${inputTemp}`) >= 0) {
      $('#cityTable').append(
        `
        <tr id = "cityDataIndex${i}" class = "filteredResults">
        <td>${cityData[i].City}</td>
        <td>${cityData[i].State}</td>S
        </tr>
        `
      )
    }
    i = i + 1;
  });
  // filter(cityData, userInputEl.val());
})






