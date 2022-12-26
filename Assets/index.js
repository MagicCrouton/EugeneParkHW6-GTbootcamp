// Current Weather data
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// Geocoding API Call
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// 5 day weather forcast
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

const API = localStorage.getItem('weatherAPI');

var coordinates = {  
  lat: 'temp',
  lon: 'temp'};             

const currentWeather = {};
var fiveDayWeather = [];
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
  console.log(data);
  for (i=0; i < data.list.length; i++){
    fiveDayWeather[i] = data.list[i];
  }});
 }



