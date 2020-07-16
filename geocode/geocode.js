const request = require('request');

var geocodeAddress = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    const key = 'pk.eyJ1IjoiY29kZXJhbmFudCIsImEiOiJja2NuZmg1YjMwYW9qMzNsdXpzdTk1ZHl2In0.MI7vlkkH2LF_pophEsz3jA';

    request({
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${key}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to server.');
        } else if (body.features.length === 0) {
            callback('Unable to find the address.');
        } else {
            callback(undefined, {
                address: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
};

module.exports = {
    geocodeAddress
};