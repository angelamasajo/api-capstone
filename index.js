'use strict';


//FETCHING WEATHER INFORMATION
// function getWoeId (cityNameWeather) {
//     //replacing spaces with +
//     cityNameWeather = cityNameWeather.replace(/ /g, '+');
//     //fetching woeid info from city input
//     let weatherUrl = `https://www.metaweather.com/api/location/search/?query=${cityNameWeather}`
//     console.log(cityNameWeather)
//     fetch(weatherUrl)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             }
//         })
//         .then(responseJson => console.log(responseJson))
//         .catch(error => alert ('Something went wrong.'))
    
//     // return responseJson[0].woeid;
// }

// $(getWoeId);


// function getWeatherInfo (woeId) {
//     woeId = INSERTEXPRESSIONHERERERERER;
//     let woeIdUrl = `https://www.metaweather.com/api/location/${woeid}/`;
//     console.log(woeId);
//     fetch(woeIdUrl)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } 
//         })
//         .then(responseJson => console.log(responseJson));
//         .catch(error => alert ('Something went wrong.'));
// }



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
            <input type="submit" value="I want to go here" class="button">
            </form>
            </li>`
        )
    };
    $('#brewery-results').removeClass('hidden');
};

// function pickBrewery () {
//     $('#pick-brewery-form').on('submit', event => {
//         event.preventDefault ();
//         console.log('pickBrewery ran');
//         //clears out the list
//         $('#brewery-results').empty();
//         //assigning variables; goal is to include name and address of the brewery in the final message
//         let title = $(event.target).closest('#pick-brewery-form').find('#input').val();
//         let address = $(event.target).closest('#pick-brewery-form').find('#brewery-address').val();
//         //adding the brewery name and address in the final message to copy and paste
//         $('#final-message').removeClass('hidden');
//         let div = document.getElementById('#final-message');
//         let content = document.createTextNode(`${title}, ${address}`);
//         div.appendChild(content);
//     })
// }



// function showInviteMessage () {
//     $('#pick-brewery-form').on('submit',  event => {
//         event.preventDefault();
//         $('#final-message').append(
//             `<p>
//             Hello friends! I think it's time for all of us to catch up! I would love it if you can join me at (brewery) located 
//             in (street), (city). The weather is supposed to be nicest on (date), so it's probably a good idea to go then! Please 
//             respond to this message if you can make it so we can get more details figured out. Hope you can make it!
//             </p>
//             `
//         )
//         $('#final-message').removeClass('hidden');
//     })
// }


function watchBrewerySearchForm() {
    $('#brewery-form').submit(event => {
        event.preventDefault();
        const cityName = $('#city-brewery').val();
        // const cityNameWeather = $('#city').val();
        // const maxResults = $('#js-max-results').val();
        // getWeatherInfo(cityNameWeather);
        getBreweryInfo (cityName);
    });
}

$(watchBrewerySearchForm);
// $(pickBrewery);