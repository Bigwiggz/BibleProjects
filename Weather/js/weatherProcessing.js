/*
Open Meteo Weather 
*/

/////////////////////////////
//Call Psychrolib Library And Global Weather Variable
/////////////////////////////
let psychroLib = new Psychrometrics();
psychroLib.SetUnitSystem(psychroLib.IP);

let globalWeather={};

const hourlyParams = [
  "temperature_2m",
  "relative_humidity_2m",
  "pressure_msl",
  "wind_speed_10m",
  "wind_direction_10m",
  "dew_point_2m",
  "apparent_temperature",
  "precipitation",
  "weather_code",
  "cloud_cover"
].join(",");

/////////////////////////////
//Weather Data Form
/////////////////////////////

// Populate datalist
const datalist = document.getElementById('locationList');
weatherStationList.forEach(loc => {
    const option = document.createElement('option');
    option.value = `${loc.City}, ${loc.StateProvince || ''}, ${loc.Country}`.replace(/, ,/g, ',').trim();
    datalist.appendChild(option);
});

//
document.getElementById('locationInput').addEventListener('change', function () {
  const input = this.value.trim().toLowerCase();

  const match = weatherStationList.find(loc => {
    const label = `${loc.City}, ${loc.StateProvince || ''}, ${loc.Country}`.replace(/, ,/g, ',').trim().toLowerCase();
    return label === input;
  });
    console.log(match);
  if (match) {
    document.getElementById('latitude').value = match.latitude;
    document.getElementById('longitude').value = match.longitude;
  } else {
    document.getElementById('latitude').value = '';
    document.getElementById('longitude').value = '';
  }
});

/////////////////////////////
//Call Weather Data
/////////////////////////////

document.getElementById("weatherForm").addEventListener("submit", function(event) {
  event.preventDefault(); // ⛔ Prevent actual page reload

  const formData = new FormData(event.target);

  //TODO: Temp Overrides-Please uncomment for full function

  const latitude = formData.get("latitude");
  const longitude = formData.get("longitude");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");

  //TODO: Temp Overrides-Please remove for full function
/*
  const latitude = 33.9388;
  const longitude = -81.1195;
  const startDate = "2024-01-01";
  const endDate = "2024-12-31";
*/
  console.log(startDate);
  console.log(endDate);

  // ✅ Now you can use these to call an API or update your page

  let urlString=formUrlStringforHistoricalAPICall(latitude, longitude, hourlyParams, startDate, endDate);
  fetchWeatherDataFromOpenMeteo(urlString);
});

/////////////////////////////
//Save Weather Data
/////////////////////////////

document.getElementById("SaveWeatherDataToFile").addEventListener("click",function(){
    //Store Weather Data
    const storedData=localStorage.getItem("hourlyWeatherData");
    
    if(storedData){
        globalWeather=JSON.parse(localStorage.getItem("hourlyWeatherData"));

        //Save to a JSON File
        downloadObjectAsJson(globalWeather, `WeatherJSONFile-${getFormattedDateTime()}`);

        //Save to a CSV File
        downloadCSV(globalWeather, `WeatherCSVFile-${getFormattedDateTime()}.csv`);
    };
    
    globalWeather={};
});



/////////////////////////////
//Fetch Weather Data Function
/////////////////////////////

//Historical Weather Data
function formUrlStringforHistoricalAPICall(latitude, longitude, hourlyParams, startDate, endDate){
    let fullUrlString=`https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=${hourlyParams}&start_date=${startDate}&end_date=${endDate}&timezone=auto`;
    return fullUrlString;
}

//Forecast Data
function formURLStringforFutureForecastsAPICall(latitude, longitude, hourlyParams, startDate, endDate){
    let fullUrlString=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=${hourlyParams}&start=${startDate}&end=${endDate}&timezone=auto`;
    return fullUrlString;
}

//Fetch weather
function fetchWeatherDataFromOpenMeteo(url){
    fetch(url)
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return response.json();
    })
    .then(data => {
        const hourlyData = data.hourly.time.map((time, idx) => ({
        index:idx,
        time,
        temperature: (data.hourly.temperature_2m[idx]*9/5)+32,
        humidity: data.hourly.relative_humidity_2m[idx],
        pressure: data.hourly.pressure_msl[idx]*0.0145038,
        windSpeed: data.hourly.wind_speed_10m[idx]*2.23694,
        windDirection: data.hourly.wind_direction_10m[idx],
        dewPoint: (data.hourly.dew_point_2m[idx]*9/5)+32,
        apparentTemperature:(data.hourly.apparent_temperature[idx]*9/5)+32,
        enthalpy: calculatePsychrometricEnthalpy((data.hourly.temperature_2m[idx]*9/5)+32, data.hourly.relative_humidity_2m[idx]/100, data.hourly.pressure_msl[idx]*0.0145038).toFixed(2),
        humidityRatio: calculatePsychrometricHumidityRatio((data.hourly.temperature_2m[idx]*9/5)+32, data.hourly.relative_humidity_2m[idx]/100, data.hourly.pressure_msl[idx]*0.0145038).toFixed(5),
        wetBulbTemperature: calculatePsychrometricWetBulb((data.hourly.temperature_2m[idx]*9/5)+32, data.hourly.relative_humidity_2m[idx]/100, data.hourly.pressure_msl[idx]*0.0145038).toFixed(2),
        precipitation:data.hourly.precipitation[idx]*0.03937008,
        weatherCode:data.hourly.weather_code[idx],
        cloudCover:data.hourly.cloud_cover[idx],
        }));

        console.log("Monthly Hourly Data:", hourlyData);

        //Save object to local storage
        localStorage.setItem("hourlyWeatherData",JSON.stringify(hourlyData));

        //Create Plotly JS Charts
        createPlotlyTempChart(hourlyData);
        createPlotlyPsychChart(hourlyData);
        createPlotlyPrecipitationChart(hourlyData);
        createPlotlyWindChart(hourlyData);
    })
    .catch(error => {
        console.error("Error fetching monthly weather data:", error);
    });
}

/////////////////////////////
//Psychrometric Calculations
/////////////////////////////


//Get Enthalpy
function calculatePsychrometricEnthalpy(temperature, relativeHumidity, pressure){
    let humidityRatio=psychroLib.GetHumRatioFromRelHum(temperature, relativeHumidity, pressure);
    return parseFloat(psychroLib.GetMoistAirEnthalpy(temperature, humidityRatio));
};

//Get Humidity Ratio
function calculatePsychrometricHumidityRatio(temperature, relativeHumidity, pressure){
    return parseFloat(psychroLib.GetHumRatioFromRelHum(temperature, relativeHumidity, pressure));
};

//Get Wet Bulb
function calculatePsychrometricWetBulb(temperature, relativeHumidity, pressure){
    return parseFloat(psychroLib.GetTWetBulbFromRelHum(temperature, relativeHumidity, pressure));
};



/////////////////////////////
//PlotlyJS Temp Main Chart
/////////////////////////////

function createPlotlyTempChart(weatherDataRequest){
    // Sample data — replace with actual fetch results!
    const timestamps = weatherDataRequest.map(obj=>obj["time"]);
    const temperaturePoints = weatherDataRequest.map(obj=>obj["temperature"]);
    const humidityPoints=weatherDataRequest.map(obj=>obj["humidity"]);
    const dewPointPoints=weatherDataRequest.map(obj=>obj["dewPoint"]);
    const enthalpyPoints=weatherDataRequest.map(obj=>obj["enthalpy"]);

    const temperatureTrace = {
    x: timestamps,
    y: temperaturePoints,
    mode: "lines",
    type: "scatter",
    line: { color: "red" },
    marker: { size: 6 },
    name: "Temperature (°F)"
    };

    const humidityTrace = {
    x: timestamps,
    y: humidityPoints,
    mode: "lines",
    type: "scatter",
    line: { color: "yellow" },
    marker: { size: 6 },
    name: "Humidity (%)"
    };

    const dewPointTrace = {
    x: timestamps,
    y: dewPointPoints,
    mode: "lines",
    type: "scatter",
    line: { color: "blue" },
    marker: { size: 6 },
    name: "Dew Point (°F)"
    };

    const enthalpyTrace = {
        x: timestamps,
        y: enthalpyPoints,
        mode: "lines",
        type: "scatter",
        line: { color: "green" },
        marker: { size: 6 },
        name: "Enthalpy (Btu/lb)"
        };

    const layout = {
    paper_bgcolor: "rgb(255,255,255)", 
    plot_bgcolor: "rgb(229,229,229)", 
    title: { text:"Temperature(°F) Dew Point(°F) & Enthalpy(Btu/lb) vs Time"},
    xaxis: { title: {text:"Time"}, type: "date" },
    yaxis: { title: {text:"Temperature (°F)" }},
    hovermode: "closest"
    };

    Plotly.newPlot("tempChart", [temperatureTrace,humidityTrace,dewPointTrace,enthalpyTrace], layout);
};

/////////////////////////////
//PlotlyJS Psych Chart
/////////////////////////////

function createPlotlyPsychChart(weatherDataRequest){
    // Sample data — replace with actual fetch results!
    const index=weatherDataRequest.map(obj=>obj["index"]);
    const temperaturePoints = weatherDataRequest.map(obj=>obj["temperature"]);
    const dewPointPoints=weatherDataRequest.map(obj=>obj["dewPoint"]);
    const enthalpyPoints=weatherDataRequest.map(obj=>obj["enthalpy"]);
    const toolTipText=weatherDataRequest.map(obj=>
        `
        DateTime: ${obj["time"]}
        Enthalpy(Btu/lb): ${obj["enthalpy"]}
        Temperature(°F): ${obj["temperature"]}
        DewPoint(°F): ${obj["dewPoint"]}
        `);

    const psychChart = {
    x: temperaturePoints,
    y: dewPointPoints,
    mode: "markers",
    type: "scatter",
    text: toolTipText,
    line: { color: "red" },
    marker: { 
        size: 6,
        color: enthalpyPoints, // your value array
        colorscale: 'Electric',
        colorbar: {title: {text:'Enthalpy'}}
    },
    name: "Psychrometric Chart"
    };

    const layout = {
    paper_bgcolor: "rgb(255,255,255)", 
    plot_bgcolor: "rgb(229,229,229)", 
    title: {text: "Psychrometric Chart"},
    xaxis: { title: {text:"Dry Bulb Temp(°F)"}, type: "linear", automargin: true},
    yaxis: { title: {text:"DewPoint(°F)"}, automargin: true },
    hovermode: "closest"
    };

    Plotly.newPlot("psychChart", [psychChart], layout);
};

/////////////////////////////
//PlotlyJS Precipitation Chart
/////////////////////////////

function createPlotlyPrecipitationChart(weatherDataRequest){
    const timestamps = weatherDataRequest.map(obj=>obj["time"]);
    const precipitationPoints=weatherDataRequest.map(obj=>obj["precipitation"]);

    const precipitationChart={
        x:timestamps,
        y:precipitationPoints,
        type:"bar",
        text:precipitationPoints,
        name:"Precipitation"
    };

    const layout = {
    paper_bgcolor: "rgb(255,255,255)", 
    plot_bgcolor: "rgb(229,229,229)", 
    title: {text:"Precipitation(in) vs Time"},
    xaxis: { title: {text: "Time"}, type: "date", automargin: true},
    yaxis: { title: {text: "Precipitation(in)" }, automargin: true },
    hovermode: "closest"
    };

    Plotly.newPlot("precipitationChart", [precipitationChart], layout);
};


/////////////////////////////
//PlotlyJS Wind Chart
/////////////////////////////

function createPlotlyWindChart(weatherDataRequest){
    const temperaturePoints = weatherDataRequest.map(obj=>obj["temperature"]);
    const windSpeedPoints=weatherDataRequest.map(obj=>obj["windSpeed"]);
    const windDirectionPoints=weatherDataRequest.map(obj=>obj["windDirection"]);
    
    const toolTipText=weatherDataRequest.map(obj=>
        `
        DateTime: ${obj["time"]}
        Enthalpy(Btu/lb): ${obj["enthalpy"]}
        Temperature(°F): ${obj["temperature"]}
        DewPoint(°F): ${obj["dewPoint"]}
        `);

    const windChart = {
        type: 'scatterpolar',
        r: windSpeedPoints,
        theta: windDirectionPoints,
        text: toolTipText,
        mode: 'markers',
        marker: {
            size: 8,
            color: temperaturePoints, // your value array
            colorscale: 'Electric',
            colorbar: {title: {text:'Temperature'}}
        },
        line: {
            color: 'blue'
        },
        name: 'Wind Speed'
    };

    const layout = {
    title: {text:'Wind Speed(mph) and Direction'},
    polar: {
        radialaxis: {
        visible: true,
        title: 'Speed (mph)'
        },
        angularaxis: {
        direction: 'clockwise',
        rotation: 90,
        tickmode: 'array',
        tickvals: [0, 90, 180, 270],
        ticktext: ['N', 'E', 'S', 'W']
        }
    }
    };

    Plotly.newPlot("windChart", [windChart], layout);
};


/////////////////////////////
//Save object as JSON
/////////////////////////////
function downloadObjectAsJson(obj, filename) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", filename + ".json");
  document.body.appendChild(downloadAnchorNode); // Required for Firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function getFormattedDateTime() {
  const now = new Date();

  const pad = (num) => String(num).padStart(2, '0');

  const MM = pad(now.getMonth() + 1); // Months are 0-based
  const DD = pad(now.getDate());
  const YYYY = now.getFullYear();
  const HH = pad(now.getHours());
  const mm = pad(now.getMinutes());
  const SS = pad(now.getSeconds());

  return `${MM}-${DD}-${YYYY}-${HH}-${mm}-${SS}`;
}

/////////////////////////////
//Save object as CSV
/////////////////////////////

function convertToCSV(arr) {
  const headers = Object.keys(arr[0]);
  const rows = arr.map(obj => headers.map(header => `"${obj[header]}"`).join(','));
  return [headers.join(','), ...rows].join('\n');
}

function downloadCSV(data, filename = 'data.csv') {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}