
//Geolocation
let lon, lat , Temperature, Humidity, weatherStatus;
if('geolocation' in navigator) {
console.log('geolocation is available');
navigator.geolocation.getCurrentPosition(async position => {
lat = position.coords.latitude.toFixed(2);
lon = position.coords.longitude.toFixed(2); 
const baseUrl = `weather/${lat},${lon}`;
const weather_response = await fetch(baseUrl);
const weather_json = await weather_response.json();
const GeoWeather = weather_json;
const {main} = GeoWeather;
Temperature = main.temp;
Humidity = main.humidity;
weatherStatus = GeoWeather.weather[0].description;
document.getElementById('latitude').textContent = lat;
document.getElementById('longitude').textContent = lon;
document.getElementById('temperature').textContent = Temperature ;
document.getElementById('humidity').textContent = Humidity;
console.log(main.temp, main.humidity);
console.log( weatherStatus);

}); 
}else {
console.log('geolocation IS NOT available');
};



async function results(_event){
  const data = {lat, lon, Temperature, Humidity, weatherStatus};
  const options = { 
  method: 'POST',
  headers: {
  'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)     
  };
  
  response =  await fetch('/api', options);
  json = await response.json();
  console.log(json);
  
} 

const button = document.getElementById("submit");
button.addEventListener('click',results )





