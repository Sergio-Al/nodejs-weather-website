const request = require('request')

const forecast = (latitude,longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/c6702c0d79e5be17921df5e27fe4ae94/'+latitude+','+longitude+'?lang=es&units=si'

    request({url, json:true},(error,{body} = {})=>{
        if(error){
            callback('Imposible conectarse al servidor Weather',undefined)
        }else if(body.error){
            callback('Imposible encontrar locacion',undefined)
        }else{
            callback(undefined, body.daily.data[0].summary+' Actualmente estamos a '+body.currently.temperature+' grados afuera. Hay '+body.currently.precipProbability+'% probabilidades de precipitaciones')
        }
    })
}

module.exports = forecast