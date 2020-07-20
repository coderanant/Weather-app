const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
const key = '';
var geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${key}`;
var weatherKey = 'd';

axios.get(geocodeUrl).then((response) => {
    if (response.data.features.length === 0) {
        throw new Error('Unable to find the addess.');
    }
    var lat = response.data.features[0].center[1];
    var lng = response.data.features[0].center[0];
    var weatherUrl = `https://api.darksky.net/forecast/${weatherKey}/${lat},${lng}`
    console.log(response.data.features[0].place_name);
    return axios.get(weatherUrl);
}).then((response) => {
    var temparature = response.data.currently.temperature;
    var apparentTemparature = response.data.currently.apparentTemperature;

    console.log(`It's currently ${temparature}. It feels like ${apparentTemparature}.`);
}).catch((e) => {
    if(e.code == 'ENOTFOUND') {
        console.log('Unable to connect to API service.');
    }
    else {
        console.log(e.message);
    }
})