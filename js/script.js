//Interação
const citySearchInput = document.getElementById("city-search-input");
const citySearchButton = document.getElementById("city-search-button");

//Exibição
const currentDate = document.getElementById("current-date");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const weatherDescription = document.getElementById("weather-description");
const currentTemperature = document.getElementById("current-temperature");
const windSpeed = document.getElementById("wind-speed");
const feelsLikeTemperature = document.getElementById("feels-like-temeprature");
const currentHumidity = document.getElementById("current-humidity");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");

const api_key = "44ca3e95b200a256e74dc9793326ab3c";

citySearchButton.addEventListener("click", () => {
  let cityName = citySearchInput.value;
  getCityWeather(cityName);
});

navigator.geolocation.getCurrentPosition(
  (position) => {
    let lat = position.coords.latitude
    let lon = position.coords.longitude
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`
    )
      .then((response) => response.json())
      .then((data) => displayWeather(data));
  },
  (err) => {
    console.log(err);
  }
);

function getCityWeather(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`
  )
    .then((response) => response.json())
    .then((data) => displayWeather(data));
}

function displayWeather(data) {
  let {
    dt,
    name,
    weather: [{ icon, description }],
    main: { temp, feels_like, humidity },
    wind: { speed },
    sys: { sunrise, sunset },
  } = data;

  currentDate.textContent = dt;
  cityName.textContent = name;
  weatherIcon.src = `img/${icon}.svg`;

  weatherDescription.textContent = description;
  currentTemperature.textContent = temp;
  windSpeed.textContent = speed;
  feelsLikeTemperature.textContent = feels_like;
  currentHumidity.textContent = humidity;
  sunriseTime.textContent = sunrise;
  sunsetTime.textContent = sunset;
}
