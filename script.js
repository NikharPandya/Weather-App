const api = {
    key: "0639b1ce4f13534382707e93776b7ea0",
    base: "https://home.openweathermap.org/api_keys"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.Value);
        console.log(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    }) .then(displayResults)
}

function displayResults(weather) {
    console.log(weather);
}
