const request = require('request');

var getWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/d6353b2124ffab53d8222675f5c6d7ec/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to forecast.io servers');
        } else if (response.statusCode == 400) {
            callback('Unable to fetch weather.');
        } else if (response.statusCode == 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
}

module.exports = {
    getWeather
}