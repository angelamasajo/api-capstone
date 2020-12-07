'use strict';

//----------------------------WEATHER INFO--------------------------//
let current_obj = {};




// FETCHING WEATHER INFORMATION
function getWeatherInfo (cityNameWeather) {
    console.log(cityNameWeather)
    //replacing spaces with +
    cityNameWeather = cityNameWeather.replace(/ /g, '+');
    //fetching woeid info from city input
    let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityNameWeather}&appid=1797367c5f35ceaf3262c0d376362893&units=imperial`
    fetch(weatherUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(responseJson => displayWeatherResults(responseJson))
        .catch(error => alert ('Something went wrong.'))
}


//DISPLAYING WEATHER INFO
function displayWeatherResults(responseJson) {
    // console.log(responseJson, 'displayWeatherResults ran');
    $('#weather-list').empty();
    for (let i = 0; i < responseJson.list.length; i = i + 8) {
        $('#weather-list').append(
            `<li><div class="day-choice">
            <form id="pick-day-form">
            <h3 id="inputWeather" target="_blank">${responseJson.list[i].dt_txt}</h3>
            <p id="weather-description">${responseJson.list[i].weather[0].description}</p>
            <p id="high-temp">High: ${responseJson.list[i].main.temp_max}&#8457;</p>
            <p id="low-temp">Low: ${responseJson.list[i].main.temp_min}&#8457;</p>
            <input type="submit" value="I want this day" class="button">
            </form>
            </div></li>`
        )
    };
    $('#weather-results').removeClass('hidden');
};



function pickDay () {
    $('#weather-results').on('submit', event => {
        event.preventDefault();
        console.log('pickDay ran');
        //clears out the list
        //assigning variables; goal is to include name and address of the brewery in the final message
        let date = $(event.target).closest('#pick-day-form').find('#inputWeather').text();
        current_obj.date = date;
        console.log(date);
        let weatherDescription = $(event.target).closest('#pick-day-form').find('#weather-description').text();
        console.log(weatherDescription);
        $('#weather-results').empty();
    })
}



//------------------------BREWERY INFO----------------------------//

//FETCHING BREWERY INFORMATION
function getBreweryInfo (cityName) {
    cityName = cityName.replace(/ /g,"_");
    let url = `https://api.openbrewerydb.org/breweries?by_city=${cityName}`

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert ('Something went wrong.'));
}


//DISPLAYING BREWERY SEARCH RESULTS
function displayResults(responseJson) {
    console.log(responseJson);
    $('#brewery-list').empty();
    for (let i = 0; i < responseJson.length; i++) {
        $('#brewery-list').append(
            `<li>
            <form id="pick-brewery-form">
            <h3><a href='${responseJson[i].url}' id="input" target="_blank">${responseJson[i].name}</a></h3>
            <p id="brewery-address">${responseJson[i].street}</p>
            <p id="brewery-city">${responseJson[i].city}</p>
            <input type="submit" value="I want to go here" class="button">
            </form>
            </li>`
        )
    };
    $('#brewery-results').removeClass('hidden');
};

function pickBrewery () {
    $('#brewery-results').on('submit', event => {
        event.preventDefault();
        console.log('pickBrewery ran');
        //clears out the list
        //assigning variables; goal is to include name and address of the brewery in the final message
        let title = $(event.target).closest('#pick-brewery-form').find('#input').text();
        current_obj.title = title
        console.log(title);
        let address = $(event.target).closest('#pick-brewery-form').find('#brewery-address').text();
        current_obj.address = address
        console.log(address);
        let cityBrewery = $(event.target).closest('#pick-brewery-form').find('#brewery-city').text();
        current_obj.cityBrewery = cityBrewery
        console.log(cityBrewery);
        $('#brewery-results').empty();
        //adding the brewery name and address in the final message to copy and paste
        $('.message').removeClass('hidden');
        displayData(current_obj);
    })
}


//---------------FINAL MESSAGE DISPLAY-------------------//


function displayData(current_obj) { 
    $('.message').append(
        `<h3> Now that you've chosen your time and location, copy and paste 
        the information below and send to your friends!
        </h3>
        <p class="final-msg"> Hello friends! I think it's time for all of us to catch up! 
        I would love it if you can join me at ${current_obj.title} 
        located in ${current_obj.address}, ${current_obj.cityBrewery}. 
        The weather is supposed to be nicest on ${current_obj.date}, 
        so it's probably a good idea to go then! 
        Please respond to this message if you can make it so we can 
        get more details figured out. Hope you can make it! </p>` 
    )
}


//----------------------WATCH FORM------------------------------//


function watchBrewerySearchForm() {
    $('#brewery-form').submit(event => {
        event.preventDefault();
        const cityName = $('#city-brewery').val();
        getBreweryInfo (cityName);
    });
}

function onWeatherSubmit (cityNameWeather) {
    $('#weather-form').submit(event => {
        event.preventDefault();
        const cityNameWeather = $('#city').val();
        // const cityNameWeather = $('#city').val();
        // const maxResults = $('#js-max-results').val();
        getWeatherInfo(cityNameWeather);
    });
}

// function handleRestartForm() {
//     $('#msg-template').on('click', '.restart-form', (event) => {
//       event.preventDefault();
//       onWeatherSubmit();
//       watchBrewerySearchForm();
//       pickBrewery();
//       pickDay();
//     }
// )};

$(onWeatherSubmit)
$(watchBrewerySearchForm);
$(pickBrewery);
$(pickDay);