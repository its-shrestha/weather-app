const url = "http://api.weatherapi.com/v1/current.json?key=f6e5b4ab7771402b8f5144815250402&q=new-delhi";

function getWeatherData(url) {
    fetch(url).then(res => res.json()).then(data => updateHTML(data)).catch(err => {
    console.error("Fetch failed:", err);
    alert("Enter a valid city.");
  });    
}

function updateHTML(data) {
    document.getElementById("city-name").innerHTML = `<h1><i class="fa fa-map-marker" style="font-size:36px"></i>   
${data.location.name}, ${data.location.country}</h1>`;
    document.getElementById("last-updated").innerHTML = `<h1>Last Updated: ${data.current.last_updated}</h1>`;

    document.getElementById("condition").innerHTML = `
    <img src=${data.current.condition.icon}>
    <h1>${data.current.condition.text}</h1>
    `;
    
    document.getElementById("feels-like").innerHTML = `
        <h1>${data.current.temp_c}°C</h1>
        <h3>Feels like: ${data.current.feelslike_c}°C</h3>
    `;

    document.getElementById("humidity").innerHTML = `
        <h2>Humidity: </h2>
        <h4>${data.current.humidity}%</h4>
    `;

    document.getElementById("wind").innerHTML = `
        <h2>Wind: </h2>
        <h4>${data.current.wind_kph} km/h</h4>
        <h4>${data.current.wind_dir}</h4>
    `;

    document.getElementById("uv").innerHTML = `
        <h2>UV: </h2>
        <h4>${data.current.uv}</h4>
    `;
}

document.getElementById("search-btn").addEventListener("click", () => {
    if(document.getElementById("city-inp").value.trim()==="")
        alert("Enter a city name");

    else {
        const city = document.getElementById("city-inp").value;
        const inpurl = `http://api.weatherapi.com/v1/current.json?key=f6e5b4ab7771402b8f5144815250402&q=${city}`;
        getWeatherData(inpurl);
    }
});

getWeatherData(url);