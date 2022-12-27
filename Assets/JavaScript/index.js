// Variable define the weather key is stored in local storage as weatherAPI
const API = localStorage.getItem('weatherAPI');
const fiveDayWeather = [];
const coordinates = {};
var currentWeather = 'temp';
const userSubmitBtn = $('#submitBtn');
const cityInputEl = $('#cityInput');
const userInputEl = $('#userInput');
var workingIndex = '';
const currentWeatherDisplayEl = $('#currentWeatherDisplay');


function geoCodeFetch (city, state){
   return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},USA&limit=5&appid=${API}`)
  .then((response) => response.json())
  .then((data) => {
    // const coordinates = [];
    coordinates.lat = data[0].lat;
    coordinates.lon = data[0].lon;
    return coordinates
  })
}

function currentWeatherFetch (lat, lon){
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`)
 .then((response) => response.json())
 .then((data) => {
  currentWeather = data;
  // these are just notes to myself to reference when pulling values from data
  // const currentWeather ={};
  // currentWeather.weatherDescrip = data.weather[0].description;
  // currentWeather.temperature = data.main.temp;
  // currentWeather.maxTemp = data.main.temp_max;
  // currentWeather.minTemp = data.main.temp_min;
  // currentWeather.humidity = data.main.humidity;
  // currentWeather.pressure = data.main.pressure;
  // currentWeather.speed = data.wind.speed;
  // currentWeather.windDeg = data.wind.deg;
  return currentWeather
 }); 
}

function fiveDayFetch (lat, lon){
  return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API}`)
 .then((response) => response.json())
 .then((data) => {
  console.log(data)
  for (i=0; i < data.list.length; i++){
    fiveDayWeather[i] = data.list[i];
  }
});
 }

 function loadCurrentWeather (currentWeather) {
  currentWeatherDisplayEl.append(`
  <div class="card col-3 bannerDisplay">
    <div class="card-header">Weather</div>
    <img id = "weatherIcon" src="https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png" class="card-img-top" alt="...">
    <div class="card-body">${currentWeather.weather[0].description}</div>
    <div class="card-body">Humidity ${currentWeather.main.humidity}</div>
    <div class="card-body">Pressure ${currentWeather.main.pressure}</div>
  </div>
  <div class="card col-3 bannerDisplay">
    <div class="card-header">Temperature</div>
    <div class="card-body">Temperature ${currentWeather.main.temp}</div>
    <div class="card-body">Max Temperature ${currentWeather.main.temp_max}</div>
    <div class="card-body">Minimum Temperature ${currentWeather.main.temp_min}</div>
  </div>
<div class="card col-3 bannerDisplay">
  <div class="card-header">Wind</div>
  <div class="card-body">Wind Speed ${currentWeather.wind.speed}</div>
  <div class="card-body">Wind Direction ${currentWeather.wind.deg}</div>
</div>
`)
 }

 function loadFiveDayForcast () {

 }

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
        <td><a id ="${i}" class = "userClick" href="">${cityData[i].City}</a></td>
        <td>${cityData[i].State}</td>
        </tr>
        `
      )
    }
    i = i + 1;
  });
 let userClickEl = $('.userClick');
  userClickEl.on('click', function(event){
    event.preventDefault();
    let temp = $(`#${event.target.id}`);
    console.log(temp.text())
    workingIndex = cityData.findIndex((element) => element.City === temp.text());
    let city = cityData[workingIndex].City;
    let state = cityData[workingIndex].State;
    async function api(){
      await geoCodeFetch(city,state).then((data) => console.log(data));
      await currentWeatherFetch(coordinates.lat, coordinates.lon).then((data) => console.log(data));
      await fiveDayFetch(coordinates.lat, coordinates.lon).then((data) => console.log(data));
      await loadCurrentWeather(currentWeather);
    }
    api();
  })
  });

 






