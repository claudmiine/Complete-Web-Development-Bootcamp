const express = require ('express');  
const https = require('https');
const bodyParser = require('body-parser');

// 2. initialize a new Express app.
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
// 4. so what should happen when the user tries to go to my home page,
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
    });

    app.post("/", (req, res) =>{

const query = req.body.cityName;
const apiKey = "cf744deedf5fbb9fcfe2c21a8a95c2fd"
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit; 
// 6. method to 
https.get(url, (response) => {
    // 7. checking code status
    console.log(response.statusCode);

// 8.
response.on('data', (data) => {
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description
    const icon =  weatherData.weather[0].icon
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    res.write("<h1>The weather in " + query +  " is " + temp + " degrees Celsius.</h1>") 
    res.write("<p>The weather is currently " + weatherDescription + "</p>")
    res.write("<img src=" + imageURL + ">");
    res.send();
})
}) 
})



// 3.  listening on port 3000 and callback function
app.listen(3000, () => {
    console.log('Server is wroking on port 3000.');
})
