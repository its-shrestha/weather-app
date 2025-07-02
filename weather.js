const url = "http://api.weatherapi.com/v1/current.json?key=f6e5b4ab7771402b8f5144815250402&q=new-delhi";

function getWeatherData(url) {
    fetch(url).then(res => res.json()).then(data => {updateHTML(data); updateUI(data.current.condition.text);}).
    catch(err => {
    console.error("Fetch failed:", err);
    alert("Fetch failed.");});    
}

function updateUI(text) {
    const condition = text.toLowerCase(); // normalize everything

    // Remove previous classes
    const body = document.getElementById("body");
    const boxes = document.querySelectorAll(".lil-boxie");
    const btn = document.getElementById("search-btn");

    const bgClasses = ["bg-mist", "bg-cloudy", "bg-snow", "bg-rain", "bg-clear", "bg-sunny", "bg-hazard", "bg-thunder"];
    const boxClasses = ["box-mist", "box-cloudy", "box-snow", "box-rain", "box-clear", "box-sunny", "box-hazard", "box-thunder"];

    bgClasses.forEach(cls => body.classList.remove(cls));
    boxClasses.forEach(cls => {
        boxes.forEach(el => el.classList.remove(cls));
        btn.classList.remove(cls);
    });

    // Start matching
    if (["mist", "fog", "freezing fog"].includes(condition)) {
        body.classList.add("bg-mist");
        boxes.forEach(el => el.classList.add("box-mist"));
        btn.classList.add("box-mist");
    }

    else if (["partly cloudy", "cloudy", "overcast"].includes(condition)) {
        body.classList.add("bg-cloudy");
        boxes.forEach(el => el.classList.add("box-cloudy"));
        btn.classList.add("box-cloudy");
    }

    else if (condition === "sunny") {
        body.classList.add("bg-sunny");
        boxes.forEach(el => el.classList.add("box-sunny"));
        btn.classList.add("box-sunny");
    }

    else if (condition === "clear") {
        body.classList.add("bg-clear");
        boxes.forEach(el => el.classList.add("box-clear"));
        btn.classList.add("box-clear");
    }

    else if (condition.includes("thunder")) {
        body.classList.add("bg-thunder");
        boxes.forEach(el => el.classList.add("box-thunder"));
        btn.classList.add("box-thunder");
    }

    else if (
        condition.includes("snow") ||
        condition.includes("pellets") ||
        condition.includes("sleet") ||
        condition.includes("blizzard")
    ) {
        body.classList.add("bg-snow");
        boxes.forEach(el => el.classList.add("box-snow"));
        btn.classList.add("box-snow");
    }

    else if (
        condition.includes("blizzard") ||
        condition.includes("freezing drizzle") ||
        condition.includes("torrential rain")
    ) {
        body.classList.add("bg-hazard");
        boxes.forEach(el => el.classList.add("box-hazard"));
        btn.classList.add("box-hazard");
    }

    else if (
        condition.includes("rain") ||
        condition.includes("drizzle")
    ) {
        body.classList.add("bg-rain");
        boxes.forEach(el => el.classList.add("box-rain"));
        btn.classList.add("box-rain");
    }
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