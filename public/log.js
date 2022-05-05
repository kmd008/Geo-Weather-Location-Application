const map = L.map('map').setView([0, 0], 2);
const  attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors';
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const mapTitles = L.tileLayer(tileURL,{attribution} );
mapTitles.addTo(map);



getData();   
async function getData(){
const response =  await fetch('/api');
const data = await response.json();
const results = data;


for (item of results) {
    const marker = L.marker([item.lat, item.lon]).addTo(map)

    const Desummary = `The weather here ${item.lat}&deg, ${item.lon}&deg ${item.weatherStatus} of a temperature of ${item.Temperature}&deg; and humidity of ${item.Humidity}&percnt;.`

    marker.bindPopup(Desummary);

}

console.log(data);

};

