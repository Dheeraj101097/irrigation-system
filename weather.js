const apikey = "01ec62901842ed5c1d9115cbac403789";

const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchcity = document.querySelector(".weather-card input");
const searchbtn = document.querySelector(".weather-card button");

let place = document.querySelector(".city");
let img = document.querySelector(".img");
let temp = document.querySelector(".temp");
let sky = document.querySelector(".sky");
let windspeed = document.querySelector(".windspeed");

async function checkweather(city) {
  let response = await fetch(url + city + `&APPID=${apikey}`);

  if (response.status == 404) {
    document.querySelector(".weather-error").style.display = "block";
    document.querySelector(".weather-data").style.display = "none";
  } else {
    var data = await response.json();
    // console.log(data);

    place.innerText = data.name;
    temp.innerText = Math.round(data.main.temp) + " °C";
    windspeed.innerText = data.wind.speed + " Kmph";
    sky.innerText = data.weather[0].description;

    if (data.weather[0].main === "Clouds") {
      img.src = "cloud.png";
    } else if (data.weather[0].main === "Clear") {
      img.src = "clear.png";
    } else if (data.weather[0].main === "Rain") {
      img.src = "rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      img.src = "drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      img.src = "mist.png";
    } else if (data.weather[0].main === "Haze") {
      img.src = "haze.png";
    } else if (data.weather[0].main === "") {
      img.src = "haze.png";
    }

    document.querySelector(".weather-data").style.display = "block";
    document.querySelector(".weather-error").style.display = "none";
  }
}

searchbtn.addEventListener("click", () => {
  checkweather(searchcity.value);
});
