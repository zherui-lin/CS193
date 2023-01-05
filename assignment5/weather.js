"use strict";

var apiKey = "181b546443225c639d4b039074ed799b";

function getUrl(zipCode) {
    return `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&APPID=${apiKey}`;
}

function processWeather(jsonResult) {
    var city = jsonResult.name;
    var temp = jsonResult.main.temp;
    document.getElementsByTagName("textarea")[0].value += `${city}: ${temp}\n`;
}

function getWeather() {
    var zipCode = document.getElementById("zipCode").value;
    fetch(getUrl(zipCode)).then((response) => response.json()).then(processWeather);
}

document.getElementById("getWeather").addEventListener("click", getWeather);
