const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')
const { send } = require('process')
const weatherrequest = require('./utils/forecast')

const app = express()
//Express config
const publicDirectorypath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../template/views') 
const partialsPath = path.join(__dirname,'../template/partials')
//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Path set for static Web Pages 
app.use(express.static(publicDirectorypath))
//re=>request
//res=>response

// app.get('',(req, res)=>{
//     res.send('<h1>Weather App</h1>')
// })
// app.get('/help',(req, res)=>{
//     res.send([{
//         name: 'Sarah'    },
//     {
//         name: 'Jason'
// }])
// })
// app.get('/about',(req, res)=>{
//     res.send('<h1>This Is About Page</h1>')
// })
app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Muaaz'

    })
})
app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About',
        name: 'Muaaz'
    })
})
app.get('/help',(req, res)=>{
    res.render('help.hbs',{
        title: 'Help Page',
        name: 'Muaaz',
        message:'How Can We Help You!'
    })
})
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send('Error Occurred')
    }
    geocode(req.query.address, (error,{longitude, lattitude, Location}={})=>{
       if(error){
        res.send({error})
       }else {
        weatherrequest(longitude, lattitude,(error,forecastdata)=>{
            if (error){
                return res.send(error)
            }
            res.send({forecastdata,Location})
        })
       }
    })
    
})
app.get('/product',(req, res)=>{
    if(!req.query.search){
       return res.send('Search Term Not found')
    }
    res.send({products:[]})
})
app.get('/help/*',(req,res)=>{
    res.render('404.hbs',{
        title:'404',
        message: '404 Help Article Not Found',
        name:' Muaaz'
    })
})
app.get('*',(req,res)=>{
    res.render('404.hbs',{
        title:'404',
        message: '404 Page Not Found',
        name:' Muaaz'
    })
})
app.listen(3000,()=>{
    console.log('Server Is Up In Running')
})