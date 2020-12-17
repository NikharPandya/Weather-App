const api = {
    key: "900fa10e864f3cd466c770abd44126cd",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.Value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q='+searchbox.Value.value+'&units=metric&APPID=${api.key}`)
     .then(weather => {
         return weather.json();
      }) .then(displayResults);
}
 
function displayResults (weather) {
    let city = document.querySelector('location .city');
    city.innertext = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let Date = document.querySelector('location .date');
    Date.innertext = DateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&#176;c</span>`;

    let weather_el = document.querySelector(' .current .weather');
    weather_el.innertext = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innertext = `${math.round(weather.main.temp_min)}&#176;c / ${math.round(weather.main.temp_max)}&#176;c`;
}

function DateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDay();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
