const express = require('express');
const  Datastore = require('nedb');
const fetch  = require('node-fetch');
require('dotenv').config();

const homeServer = express();
const port = process.env.PORT || 3000;

homeServer.listen(port, () => console.log(`Server listening at ${port}`));
homeServer.use(express.static('public'));
homeServer.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();


homeServer.get('/api', (request, response) => {
database.find({}, (err, data) => {
if(err){
response.end();
return;
}
response.json(data);
});

});


homeServer.post('/api', (request, response) =>{
const data = request.body;
const timestamp = Date.now();
data.timestamp = timestamp;
database.insert(data);
response.json(data);
});



homeServer.get('/weather/:latlon',  async (request, response) => {
console.log(request.params);
const latlon = request.params.latlon.split(',');
console.log(latlon);
const lat = latlon[0];
const lon = latlon[1];
console.log(lat, lon); 
const API = process.env.API_KEY;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`;
const weather_response =  await fetch(baseUrl);  
const weather_json =  await weather_response.json();
response.json(weather_json);
});

