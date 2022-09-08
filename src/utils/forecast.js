const request = require('request')
const weatherrequest = (Longitude,Lattitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=8d3a496640a6f6227bd592fc97f573fe&query='+Lattitude+','+Longitude
    request({url, json: true},(error,{body})=>{
        if(error){
            callback('Unable To Connect To Weather Services',undefined)
        }else if(body.error){
            callback('Unable To Find Weather For Current Location',undefined)
        }else{
            callback(undefined,'Current Temprature IS '+body.current.temperature+' degrees out. '+
                ' And It Feels Like '+body.current.feelslike+' degrees '+
                ' And Its '+body.current.weather_descriptions[0]+'. And Humidity is '+body.current.humidity)
        }
    })
}
module.exports = weatherrequest