const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Googly'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Googly'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Googly'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(address, (error, {location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(location, (error, forecastdata) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastdata,
                location,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Googly',
        error: '404, Page not found. Check for a valid url.'
    })
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
