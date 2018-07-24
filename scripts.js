// show weather button
 window.onload = function() {
  document.getElementById('showWeather').style.display = 'none';
}
// loading api
 function hideButton() {
  document.getElementById('buttonSection').style.display = 'none';

}

// Get location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log(lat, lon);
    getWeather(lat, lon);
    hideButton();
    })
}
  else {
    window.alert('Could not find location');
  }
}

// Update API url & pull data
var key = keys.WEATHER_KEY;
function getWeather(lat, lon) {
  var url = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=` + key;

  fetch(url)
  .then(
    r => {
      return r.json();
    }
  )
  .then(
    data => {
      // Weather description
      let description = document.getElementById('description');
      let descrNode = document.createTextNode(data.weather[0].description);
      description.appendChild(descrNode);

      // Temperature | F
      let temp = document.getElementById('imperial');
      let fahr = function() {
        return Math.round((data.main.temp * 1.8) + 32);
      }();
      let temperature = document.createTextNode(fahr);
      temp.prepend(temperature);

      // Temperature | C
      let tempC = document.getElementById('celsius');
      let tempCels = document.createTextNode(Math.round(data.main.temp))
      tempC.prepend(tempCels);

      // Humidity
     let humSection = document.getElementById('humidity');
     let currentHumidity = document.createTextNode(data.main.humidity);
     humSection.prepend(currentHumidity);

     // Temperature-Max
     let tempMaxSection = document.getElementById('tempMax');
     let tempMax = document.createTextNode(data.main.temp_max);
     tempMaxSection.prepend(tempMax);

     //Temperature-Min
     let tempMinSection = document.getElementById('tempMin');
     let tempMin = document.createTextNode(data.main.temp_min);
     tempMinSection.prepend(tempMin);

     // city name
     let city = document.getElementById('city');
     let cityName = document.createTextNode(data.name);
     city.appendChild(cityName);

     //icon
    let iconId = data.weather[0].id;
    icon(iconId);

     // time
    let currentTime = data.dt;
    let sunrise = data.sys.sunrise;
    let sunset = data.sys.sunset;
    background(iconId, currentTime, sunrise, sunset);

    document.getElementById('showWeather').style.display = 'block';
   }
  )
  .catch(
    e => {
      console.log(`An error occurred: ${e}`);
    }
  );
}

// Change weather icon
 function icon(id) {
   switch(true) {
     case (id >= 200 && id <= 232):
        var image = document.getElementById('icon');
        image.src = 'assets/thunderstorm.png'
        break;
     case (id >= 300 && id <= 531):
        var image = document.getElementById('icon');
        image.src = 'assets/rain.png'
        break;
     case (id >= 600 && id <= 622):
        var image = document.getElementById('icon');
        image.src = 'assets/snow.png'
        break;
     case 800:
        var image = document.getElementById('icon');
        image.src = 'assets/sunny.png'
        break;
     case (id >= 801 && id <= 802):
        var image = document.getElementById('icon');
        image.src = 'assets/part_cloud_day.png'
        break;
     case (id >= 803 && id <= 804):
        var image = document.getElementById('icon');
        image.src = 'assets/cloud.png'
        break;
        case (id >= 700 && id <= 781):
           var image = document.getElementById('icon');
           image.src = 'assets/cloud.png'
           break;
    /* case:
        var image = document.getElementById('icon';)
        image.src = 'assets/part_cloud_night'
        break; */
   }
}

// Change background color
 function background(id, currentTime, sunrise, sunset) {
  var body = document.getElementsByClassName('default');
  switch(true) {
    case (currentTime > sunrise && (id >= 801 && id <= 804)):
       document.body.classList.add('cloud_rain');
       break;
    case (currentTime > sunrise && (id >= 200 && id <= 531)):
          document.body.classList.add('cloud_rain');
          break;
    case (currentTime > sunrise && (id >= 700 && id <= 781)):
          document.body.classList.add('day');
          break;
    case (currentTime > sunset):
          document.body.classList.add('day');
          break;
    case (currentTime > sunset):
        document.body.classList.add('night');
        break;
  }
}
