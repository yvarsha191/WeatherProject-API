/******HOW TO MAKE GET REQUEST WITH NODE HTTPS***** */

const { log } = require("console");
const express = require("express");
const https = require("https");  //dont need to be install bcos its native
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
    //res.send("server is up and running");
});

app.post("/", function (req, res) {   //parsing post request to server


    /*****RENDERING WITH LIVE API DATA************ */

    const query = req.body.cityName;  //parsing using body parser
    const apikey = "7a59888384757b9059c8165c406ca153";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + " &appid=" + apikey + "&units=" + unit;

    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            //console.log(data);
            //this line shows data in anonymous lang
            // /**so we parse JSON to understand it**/
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp; //fetching data from json file
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"; //get image of type of temp
            const desc = weatherData.weather[0].description;
            res.write("<p>The weather is currently: " + desc + "<p>");
            res.write("The weather in " + query + " is " + temp + " degrees celsius");
            res.write("<img src=" + imageURL + ">");// print image on browser
            res.send();
        });
    });
});







app.listen(3000, function () {
    console.log("Server is running on port 3000");
});