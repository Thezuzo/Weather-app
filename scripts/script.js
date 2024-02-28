const apiKey = "";

const form = {
    cityInput: document.querySelector("#city-input"),
    searchBtn: document.querySelector("#search"),
    cityElement: document.querySelector("#city"),
    tempElement: document.querySelector("#temperature span"),
    descElement: document.querySelector("#description"),
    WeatherElement: document.querySelector("#weather-icon"),
    countryFlag: document.querySelector("#country"),
    humidityElement: document.querySelector("#humidity span"),
    windElement: document.querySelector("#wind span"),
    weatherContainer: document.querySelector("#weather-data")
};


// functions
const getWeather = async (city) => {
    const WeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(WeatherUrl);
    const data = await res.json();

    return data;
};

const showWeather = async (city) => {
    const data = await getWeather(city);

    form.cityElement.innerText = data.name;
    form.tempElement.innerText = parseInt(data.main.temp);
    form.descElement.innerText = data.weather[0].description;
    form.WeatherElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    form.countryFlag.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`)
    form.humidityElement.innerText = `${data.main.humidity}%`;
    form.windElement.innerText = `${data.wind.speed}km/h`

    form.weatherContainer.classList.remove("hide")
};  

// events
form.searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = form.cityInput.value;

    showWeather(city);
});


form.cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value;
        showWeather(city)
    }
})