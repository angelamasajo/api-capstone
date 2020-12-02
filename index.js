'use strict';

function getWeatherInfo (cityNameWeather) {
    cityNameWeather = cityNameWeather.replace(/ /g,"+");
    let weatherUrl = `https://www.metaweather.com/api/location/search/?query=${cityNameWeather}`

    fetch(weatherUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(responseJson => console.log(responseJson))
        .catch(error => alert ('Something went wrong.'))
}

function getBreweryInfo (cityName) {
    cityName = cityName.replace(/ /g,"_");
    let url = `https://api.openbrewerydb.org/breweries?by_city=${cityName}`

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(responseJson => console.log(responseJson))
        .catch(error => alert ('Something went wrong.'));
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const cityName = $('#city-brewery').val();
        const cityNameWeather = $('#city').val();
        // const maxResults = $('#js-max-results').val();
        getWeatherInfo(cityNameWeather);
        getBreweryInfo (cityName);
    });
}

$(watchForm);