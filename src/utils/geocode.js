const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiamFqYXRlZW5hbmRpbmVlc2Fob28iLCJhIjoiY2ttcmVzanU4MDM1ZDJvcGNrNWF5Z3lrNiJ9.9II_gbKf2URr2cPwK7ub9g&limit=1`

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location. Please try other location.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode