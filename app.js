const request = require('request');
const yargs = require('yargs');

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

const encodedAddress = encodeURIComponent(argv.a);
const key = 'pk.eyJ1IjoiY29kZXJhbmFudCIsImEiOiJja2NuZmg1YjMwYW9qMzNsdXpzdTk1ZHl2In0.MI7vlkkH2LF_pophEsz3jA';

request({
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${key}`,
    json: true
}, (error, response, body) => {
    if (error) {
        console.log('Unable to connect to server.');
    } else if (body.features.length === 0) {
        console.log('Unable to find the address.');
    } else {
        console.log(`Address: ${body.features[0].place_name}`);
        console.log(`Latitude: ${body.features[0].center[1]}`);
        console.log(`Longitude: ${body.features[0].center[0]}`);
    }
})