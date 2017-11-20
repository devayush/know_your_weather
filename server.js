'use strict';
const express = require('express');
const app = express();
const request = require('request');
const config = require('config');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  
  let apiKey = config.openWeather.apiKey;
  // const argv = require('yargs').argv;
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } 
    else {
      let weather = JSON.parse(body);
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        // let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}! with Humidity ${weather.main.humidity}%`;
        res.render('custom', {weather: weather, condition: weather.weather[0].main});
      }
    }
  });
    console.log(req.body.city);
})

app.listen(3000, function () {
  console.log('Search for weather on port 3000!');
})