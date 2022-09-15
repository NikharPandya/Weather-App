const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=900fa10e864f3cd466c770abd44126cd`
  )
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector(".city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let feel = document.querySelector(".feels-like");
  feel.innerHTML = `Feels like:${Math.round(
    weather.main.feels_like
  )}<span>°c</span>`;

  let weather_el = document.querySelector(".weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;

  let sunrise = document.querySelector(".sun .sunrise");
  sunrise.innerHTML = `Sunrise: ${format_time(weather.sys.sunrise)}`;

  let sunset = document.querySelector(".sun .sunset");
  sunset.innerHTML = `Sunset: ${format_time(weather.sys.sunset)}`;

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${weather.main.humidity} %`;

  let weather_icon = document.querySelector(".icon");
  let idIcon = weather.weather[0].icon;
  weather_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${idIcon}@4x.png" alt="icon" class="glass"/>`;

  dynamicBG(weather.weather[0].id);
}

function dynamicBG(i) {
  const bg = document.querySelector("#background");

  if ((i >= 200) & (i < 300)) {
    bg.className = "rain";
  } else if ((i >= 300) & (i < 600)) {
    bg.className = "rain";
  } else if ((i >= 600) & (i < 700)) {
    bg.className = "snow";
  } else if ((i >= 701) & (i < 800)) {
    bg.className = "atmosphere";
  } else if (i === 800) {
    bg.className = "clear";
  } else if (i >= 801) {
    bg.className = "cloud";
  }
}



function format_time(s) {
  const dtFomrat = new Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
    timeZone: "EST",
  });
  return dtFomrat.format(new Date(s * 1e3));
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
