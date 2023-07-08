/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
let f_Url = 'http://api.weatherapi.com/v1/forecast.json?key=4e2c0da80bb14580863215411230607&q=New_Delhi&days=3&aqi=no&alerts=no';
const search = document.querySelector('.search');
const temp = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const wspeed = document.querySelector('.windspeed');
const wdate = document.querySelector('.wdate');
const wlogo = document.querySelector('.logo');
const city = document.querySelector('.city');
const wgif = document.querySelector('.weathergif');
const day1logo = document.querySelector('.day1pic');
const day1txt = document.querySelector('.day1txt');

const day2logo = document.querySelector('.day2pic');
const day2txt = document.querySelector('.day2txt');

const day3logo = document.querySelector('.day3pic');
const day3txt = document.querySelector('.day3txt');
const f = document.querySelector('.f');
const c = document.querySelector('.c');

getWeather(f_Url);

search.addEventListener('keydown', (e)=> {
  if (e.key === 'Enter') {
    const q = search.value;
    f_Url = `http://api.weatherapi.com/v1/forecast.json?key=4e2c0da80bb14580863215411230607&q=${q}&days=3&aqi=no&alerts=no`;
    getWeather(f_Url);
  }
});

f.addEventListener('click', ()=> {
  getWeather(f_Url, 'F°');
});
c.addEventListener('click', ()=> {
  getWeather(f_Url);
});

async function getWeather(url, unit='C°') {
  try {
    const response = await fetch(url, {mode: 'cors'});
    const weather = await response.json();
    if (unit==='C°') {
      temp.textContent = `Temp: ${weather.current.temp_c} ${unit}`;
    } else {
      temp.textContent = `Temp: ${weather.current.temp_f} ${unit}`;
    }
    temp.style = 'font-size: 24px;';
    humidity.textContent = `Humidity: ${weather.current.humidity}%`;
    wspeed.textContent = `Wind Speed: ${weather.current.wind_kph}km/h`;
    wdate.textContent = `Condition: ${weather.current.condition.text}`;
    city.textContent = `${weather.location.name}, ${weather.location.region}`;
    wdate.style = 'font-size: 24px';
    wlogo.src = weather.current.condition.icon;

    day1logo.src = weather.forecast.forecastday[0].day.condition.icon;
    day2logo.src = weather.forecast.forecastday[1].day.condition.icon;
    day3logo.src = weather.forecast.forecastday[2].day.condition.icon;

    day1txt.textContent = weather.forecast.forecastday[0].date;
    day2txt.textContent = weather.forecast.forecastday[1].date;
    day3txt.textContent = weather.forecast.forecastday[2].date;
    const gif_url = `https://api.giphy.com/v1/gifs/translate?api_key=dC5HrTw3DTIx8Vkrdv1o823q3qYY1jKL&s=${weather.current.condition.text}`;
    getGif(gif_url);
    return weather;
  } catch (error) {
    console.log(error);
  }
};

async function getGif(url) {
  try {
    const response = await fetch(url, {mode: 'cors'});
    const gif = await response.json();
    wgif.src = gif.data.images.original.url;
  } catch (error) {
    console.log(error);
  }
};
