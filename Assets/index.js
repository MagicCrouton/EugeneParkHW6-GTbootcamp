// Current Weather data
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// Geocoding API Call
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// 5 day weather forcast
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

const API = localStorage.getItem('weatherAPI');
var feed = {  
                lat: 'temp',
                lon: 'temp'};


function geoCodeFetch (city, state){
   fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},USA&limit=5&appid=${API}`)
  .then((response) => response.json())
  .then((data) => {
    feed.lat = data[0].lat;
    feed.lon = data[0].lon;
    console.log(data);
    // console.log(`lat: ${lat} lon: ${lon}`)
  })
}

function currentWeatherFetch (lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`)
 .then((response) => response.json())
 .then((data) => console.log(data)); 
}

function fiveDayFetch (lat, lon){
  fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API}`)
 .then((response) => response.json())
 .then((data) => console.log(data)); 
}



