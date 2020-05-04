/**
 * Weather App
 * DONE: Complete getWeatherData() to return json response Promise
 * DONE: Complete searchCity() to get user input and get data using getWeatherData()
 * TODO: Complete showWeatherData() to set the data in the the html file from response
 */

// API_KEY for maps api
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

/**
 * Retrieve weather data from openweathermap
 * HINT: Use fetch()
 * HINT: URL should look like this: 
 * https://api.openweathermap.org/data/2.5/weather?q=detroit&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial
 */
getWeatherData = (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  //HINT: Use template literals to create a url with input and an API key
  const FULL_URL = `${URL}?q=${city}&appid=${API_KEY}&units=imperial`
  //CODE GOES HERE
  const weatherPromise = fetch(FULL_URL);
  return weatherPromise.then((response)=>{
    return response.json();
  })
}

/**
 * Retrieve city input and get the weather data
 * HINT: Use the promise returned from getWeatherData()
 */
searchCity = () => {
  const city = document.getElementById('city-input').value;
  // CODE GOES HERE
  getWeatherData(city)
  .then((response)=>{
    console.log(response);
    showWeatherData(response);
  }).catch((error)=>{
    showErrorData();
  })

}

/**
 * Show the weather data in HTML
 * HINT: make sure to console log the weatherData to see how the data looks like
 */
showWeatherData = (weatherData) => {
  //CODE GOES HERE

  //convert fahrenheit to celsius
  const celcius = Math.floor((((weatherData.main.temp-32)*5)/9));
  const minCelcius = Math.floor((((weatherData.main.temp_min-32)*5)/9));
  const maxCelcius = Math.floor((((weatherData.main.temp_max-32)*5)/9));

  //change the background base on the weather
  if(weatherData.weather[0].icon == '01d' || weatherData.weather[0].icon == '01n'){
    document.body.style.backgroundImage = "url('img/clearSky.jpg')";
  }else if(weatherData.weather[0].icon == '02d' || weatherData.weather[0].icon == '02n'){
    document.body.style.backgroundImage = "url('img/fewClouds.jpg')";
  }else if(weatherData.weather[0].icon == '03d' || weatherData.weather[0].icon == '03n'){
    document.body.style.backgroundImage = "url('img/scatteredClouds.jpg')";
  }else if(weatherData.weather[0].icon == '04d' || weatherData.weather[0].icon == '04n'){
    document.body.style.backgroundImage = "url('img/brokenClouds.jpg')";
  }else if(weatherData.weather[0].icon == '09d' || weatherData.weather[0].icon == '09n'){
    document.body.style.backgroundImage = "url('img/showerRain.jpg')";
  }else if(weatherData.weather[0].icon == '10d' || weatherData.weather[0].icon == '10n'){
    document.body.style.backgroundImage = "url('img/rain.jpg')";
  }else if(weatherData.weather[0].icon == '11d' || weatherData.weather[0].icon == '11n'){
    document.body.style.backgroundImage = "url('img/thunderstorm.jpg')";
  }else if(weatherData.weather[0].icon == '13d' || weatherData.weather[0].icon == '13n'){
    document.body.style.backgroundImage = "url('img/snow.jpg')";
  }else if(weatherData.weather[0].icon == '50d' || weatherData.weather[0].icon == '50n'){
    document.body.style.backgroundImage = "url('img/mist.jpg')";
  }else{
    document.body.style.backgroundImage = "url('img/bg.jpg')";
  }
  
  document.getElementById('city-name').innerText = `${weatherData.name}, ${weatherData.sys.country}`;
  document.getElementById('weather-type').innerHTML = `<img src= "http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png">${weatherData.weather[0].main}`;
  document.getElementById('temp').innerText = `Temperature: ${celcius}°C`;
  document.getElementById('min-temp').innerText = `Min Temperature: ${minCelcius}°C`;
  document.getElementById('max-temp').innerText = `Max Temperature: ${maxCelcius}°C`;
  
}

//Show error when no city is found
showErrorData = () => {
  document.getElementById('city-name').innerHTML = "Error 403: City not found!";
}

//Search using enter key
document.addEventListener("keyup", function(event){
  if(event.keyCode == 13){
      searchCity();
  }
});
