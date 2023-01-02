// Variable define the weather key is stored in local storage as weatherAPI
const fiveDayWeather = [];
const coordinates = {};
var currentWeather = 'temp';
const userSubmitBtn = $('#submitBtn');
const cityInputEl = $('#cityInput');
const userInputEl = $('#userInput');
var workingIndex = '';
const currentWeatherDisplayEl = $('#currentWeatherDisplay');

// this modal pops up if no API is detected in local memory
if (localStorage.getItem('weatherAPI') === null) {
  // for some reason i can only define a prompt response as a var and not a const
const API = window.prompt(`Oops you need an API for this page to work
                           Please go to https://openweathermap.org/api
                           and create or get your api and enter here`)
localStorage.setItem('weatherAPI', API);
}

const API = localStorage.getItem('weatherAPI');


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
  // console.log(data)
  for (i=0; i < data.list.length; i++){
    fiveDayWeather[i] = data.list[i];
  }
});
 }

 function loadCurrentWeather (currentWeather) {
  $('#startWeather').remove();
  currentWeatherDisplayEl.empty();
  currentWeatherDisplayEl.append(`
  <div class="card col-3 bannerDisplay">
    <div class="card-header">Current Weather in ${currentWeather.name}</div>
    <img id = "weatherIcon" src="https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png" class="card-img-top" alt="CurrentWeather">
    <div class="card-body">${currentWeather.weather[0].description}</div>
  </div>
  <div class="card col-3 bannerDisplay">
    <div class="card-header">Humidity and Pressure</div>
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

 function loadFiveDayForcast (fiveDayWeather) {
  let dayCount = 1;
  for (i=0; i<fiveDayWeather.length; i=i+8) {
    $(`#day${dayCount}PlaceHolder`).remove();
    $(`#day${dayCount}ForcastSummary`).empty();
    $(`#day${dayCount}ForcastSummary`).append(`
    <div class="card col-10 summaryDisplay">
    <img id = "weatherIcon${i}" class = "summaryImage" src="https://openweathermap.org/img/wn/${fiveDayWeather[i].weather[0].icon}@2x.png" class="card-img-top" alt="WeatherForcast">
    <div class="card-header">Weather Forcast for ${fiveDayWeather[i].dt_txt}</div>
    <div class="card-body">${fiveDayWeather[i].weather[0].description}</div>
    </div>`);
    for (n=0; n<8; n++) {
      $(`#day${dayCount}DetailedForecast`).empty();
      $(`#day${dayCount}DetailedForecast`).append(`
      <div class = "hourByHour">
      <div class="card col-3 detailedDisplay">
        <div class="card-header">Weather at ${fiveDayWeather[i+n].dt_txt}</div>
        <img id = "weatherIcon" src="https://openweathermap.org/img/wn/${fiveDayWeather[i+n].weather[0].icon}@2x.png" class="card-img-top" alt="CurrentWeather">
        <div class="card-body">${fiveDayWeather[i+n].weather[0].description}</div>
      </div>
      <div class="card col-3 detailedDisplay">
        <div class="card-header">Humidity and Pressure</div>
        <div class="card-body">Humidity ${fiveDayWeather[i+n].main.humidity}</div>
        <div class="card-body">Pressure ${fiveDayWeather[i+n].main.pressure}</div>
      </div>
      <div class="card col-3 detailedDisplay">
        <div class="card-header">Temperature</div>
        <div class="card-body">Temperature ${fiveDayWeather[i+n].main.temp}</div>
        <div class="card-body">Max Temperature ${fiveDayWeather[i+n].main.temp_max}</div>
        <div class="card-body">Minimum Temperature ${fiveDayWeather[i+n].main.temp_min}</div>
      </div>
    <div class="card col-3 detailedDisplay">
      <div class="card-header">Wind</div>
      <div class="card-body">Wind Speed ${fiveDayWeather[i+n].wind.speed}</div>
      <div class="card-body">Wind Direction ${fiveDayWeather[i+n].wind.deg}</div>
    </div>
    </div>
    `)
    }
    dayCount = dayCount+1;
 }}

//  creates new object based on current searched weather the index input is the cityData index in the larger
// data file in AutoCompleteData
 function weatherDataStore(c, s, cw, fdw,index) {
  this.city=c;
  this.state=s;
  this.currentWeather=cw;
  this.fiveDayWeather=fdw;
  this.identifierTag = `${c}${index}`
 }

 function setSearchHistoryItem() {
  if (localStorage.getItem('weatherHistory') === null) {
    let weatherHistory = [];
    weatherHistory[0] = new weatherDataStore(city, state, currentWeather, fiveDayWeather, workingIndex);
    localStorage.setItem('weatherHistory', JSON.stringify(weatherHistory));
  }
  else {
    // this pulls the current weather history out of local storage and pushed the latest into the array
    let weatherHistory = JSON.parse(localStorage.getItem('weatherHistory'));
    let currentWeatherData = new weatherDataStore(city, state, currentWeather, fiveDayWeather, workingIndex);
    weatherHistory.push(currentWeatherData);
    // updates the latest search history and pushes into memory
    localStorage.setItem('weatherHistory', JSON.stringify(weatherHistory));
       }
    // make function to place history item here
    // weatherHistory.forEach(() => {
    // })
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

// This compares what was typed in to pull up something that matches every time submit is clicked
// this, originally i did a jquery autocomplete plug in but the data set was large and creating perfomance issues.

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
    let workingIndex = cityData.findIndex((element) => element.City === temp.text());
    console.log(workingIndex);
    let city = cityData[workingIndex].City;
    let state = cityData[workingIndex].State;
    async function api(){
      await geoCodeFetch(city,state).then((data) => console.log(data));
      await currentWeatherFetch(coordinates.lat, coordinates.lon).then((data) => console.log(data));
      await fiveDayFetch(coordinates.lat, coordinates.lon).then((data) => console.log(data));
      await loadCurrentWeather(currentWeather);
      await loadFiveDayForcast(fiveDayWeather);
      function setSearchHistoryItem() {
        if (localStorage.getItem('weatherHistory') === null) {
          let weatherHistory = [];
          weatherHistory[0] = new weatherDataStore(city, state, currentWeather, fiveDayWeather, workingIndex);
          localStorage.setItem('weatherHistory', JSON.stringify(weatherHistory));
        }
        else {
          // this pulls the current weather history out of local storage and pushed the latest into the array
          let weatherHistory = JSON.parse(localStorage.getItem('weatherHistory'));
          let currentWeatherData = new weatherDataStore(city, state, currentWeather, fiveDayWeather, workingIndex);
          weatherHistory.push(currentWeatherData);
          // updates the latest search history and pushes into memory
          localStorage.setItem('weatherHistory', JSON.stringify(weatherHistory));
             }

          // make function to place clickable history items
          $(`#searchHistory`).empty();
          // this puts the title back into the the search history section
          $(`#searchHistory`).append(`<h3>Search History</h3>`);
          let weatherHistory = JSON.parse(localStorage.getItem('weatherHistory'));
          // this creates a history search button and adds event Listener
          weatherHistory.forEach((element) => {
            $(`#searchHistory`).append(`
              <td> <button id = "${element.identifierTag}" class = "searchHistory">${element.city},    ${element.state}</button></td>
            `)
            // the event listner pulls data based on the "identifierTag" from local memory and populatest the weather
            // screen
            $(`#${element.identifierTag}`).on('click', (event) => {
              event.preventDefault();
              let tempId = event.target.id;
              let weatherHistory = JSON.parse(localStorage.getItem('weatherHistory'));
              let workingIndex = weatherHistory.findIndex((element) => element.identifierTag === tempId);
              loadCurrentWeather(weatherHistory[workingIndex].currentWeather);
              loadFiveDayForcast(weatherHistory[workingIndex].fiveDayWeather);
            })
          })
       }
      await setSearchHistoryItem();
    }
    api();
  })
  });

 






