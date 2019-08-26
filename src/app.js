const path = require('path')
const express= require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Aslfur'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title :'About Me',
        name :'About Boot'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help Page',
        message: 'This is a help page but i can not help a lot',
        name: 'Helper Boot'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'you must put an address for a location'
        })
    }
    geocode(req.query.address,(error,{latitude, longitude, location}= {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastdata,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        message: 'Help article not found',
        name: 'Aslfur'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        message: 'Page not found',
        name: 'Aslfur'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})
