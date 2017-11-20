let request = require('request');

let apiKey = 'e60211ce69122461e9a29d5dcd8c6bc3';
const argv = require('yargs').argv;
let city = argv.c || 'kanpur';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
        let weather = JSON.parse(body);
        let message = `It's ${weather.main.temp} degrees in ${weather.name}! with Humidity of ${weather.main.humidity}%`;
        console.log('body:', message);
  }
});

