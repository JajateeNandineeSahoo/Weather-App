const request = require('request')

const forecast = (address, callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=614d80115f3860a4888ed0908ee05a74&query=${address}`

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out but it feels like ${body.current.feelslike} degress out.`)
        }
    })
}

module.exports = forecast