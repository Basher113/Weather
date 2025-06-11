import CloudSvg from "./assets/cloud.svg";

export const getWeather = async (location) => {
  // eslint-disable-next-line
  const apiKey = process.env.API_KEY;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;
  try {
    const response = await fetch(url, { mode: "cors" });
    if (response.status === 400) {
      throw new Error("No location found for: " + location);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

// Weather Dom
const weatherContent = document.querySelector(".weather-content");
const loader = document.querySelector(".loader");
const errorMessageSpan = document.querySelector(".error-message");
export const updateWeatherContent = async (location) => {
  weatherContent.classList.remove("visible"); // hide the weather content
  errorMessageSpan.textContent = "";
  loader.classList.add("visible"); // show the spinner
  try {
    const weatherObj = await getWeather(location);
    weatherContent.textContent = "";
    createWeatherElement(weatherObj);
    weatherContent.classList.add("visible"); // show weather content
  } catch (error) {
    const errorMessage = error.message;
    if (errorMessage === "Error: No location found for: " + location) {
      errorMessageSpan.textContent = "Location not found for " + location;
    } else {
      errorMessageSpan.textContent = "Unexpected Error. Please try again later";
    }
  }

  loader.classList.remove("visible"); // hide the loader after getting the weatherObj
};

export const createWeatherElement = (weatherObj) => {
  const weatherCurrentCondition = weatherObj.currentConditions;
  const leftDiv = document.createElement("div");
  leftDiv.className = "left";
  const address = document.createElement("h3");
  address.className = "address";
  address.textContent = weatherObj.resolvedAddress;

  // Description and Image container
  const descImg = document.createElement("div");
  descImg.className = "desc-img";

  const description = document.createElement("div");
  description.className = "description";
  description.textContent = `"${weatherCurrentCondition.conditions}"`;

  const img = document.createElement("img");
  img.src = CloudSvg;
  img.alt = "cloud icon";
  img.height = 80;
  img.width = 80;

  descImg.appendChild(description);
  descImg.appendChild(img);

  const temperature = document.createElement("div");
  temperature.className = "temperature";
  temperature.textContent = `${weatherCurrentCondition.temp}°`;

  leftDiv.appendChild(address);
  leftDiv.appendChild(descImg);
  leftDiv.appendChild(temperature);

  const rightDiv = document.createElement("div");
  rightDiv.className = "right";

  // helper for creating infos
  function createInfoBlock(className, label, value) {
    const container = document.createElement("div");
    container.className = `info ${className}`;

    const labelDiv = document.createElement("div");
    labelDiv.textContent = `${label}: `;

    const valueDiv = document.createElement("div");
    valueDiv.textContent = value;

    container.appendChild(labelDiv);
    container.appendChild(valueDiv);

    return container;
  }

  // Info blocks

  const windspeed = createInfoBlock(
    "windspeed",
    "Windspeed",
    weatherCurrentCondition.windspeed,
  );
  const feels = createInfoBlock(
    "feels",
    "Feels like",
    weatherCurrentCondition.feelslike,
  );
  const humidity = createInfoBlock(
    "humidity",
    "humidity",
    weatherCurrentCondition.humidity,
  );
  const uvIndex = createInfoBlock(
    "uv-index",
    "UV Index",
    weatherCurrentCondition.uvindex,
  );

  rightDiv.appendChild(windspeed);
  rightDiv.appendChild(feels);
  rightDiv.appendChild(humidity);
  rightDiv.appendChild(uvIndex);
  weatherContent.appendChild(leftDiv);
  weatherContent.appendChild(rightDiv);
  return weatherContent;
};
