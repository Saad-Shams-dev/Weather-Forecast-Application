/* ================= API CONFIGURATION ================= */

// OpenWeatherMap API key
const API_KEY = "9286cbceeabf6403fb2be4e60bcabf3a";

/* ================= DOM ELEMENT REFERENCES ================= */

// Input & buttons
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

// Message boxes
const errorBox = document.getElementById("errorBox");
const alertBox = document.getElementById("alertBox");

// Weather display containers
const currentWeather = document.getElementById("currentWeather");
const forecastSection = document.getElementById("forecastSection");
const forecastCards = document.getElementById("forecastCards");

// Weather data fields
const cityNameEl = document.getElementById("cityName");
const tempEl = document.getElementById("temp");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");
const conditionEl = document.getElementById("condition");
const weatherIcon = document.getElementById("weatherIcon");

// Recent search elements
const recentContainer = document.getElementById("recentContainer");
const recentDropdown = document.getElementById("recentDropdown");

// Temperature toggle & body
const unitToggle = document.getElementById("unitToggle");
const body = document.getElementById("body");

/* ================= STATE VARIABLES ================= */

// Stores temperature in Celsius for unit conversion
let currentTempC = null;

// Tracks current temperature unit
let isCelsius = true;

/* ================= EVENT HANDLERS ================= */

// Search weather by city name
searchBtn.onclick = () => {
  const city = cityInput.value.trim();

  // Prevent empty input submission
  if (!city) return showError("Please enter a city name");

  fetchWeatherByCity(city);
};

// Fetch weather using user's geolocation
locationBtn.onclick = () => {
  navigator.geolocation.getCurrentPosition(pos => {
    fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
  });
};

// Toggle between Celsius and Fahrenheit
unitToggle.onclick = () => toggleTemp();

// Fetch weather when recent city is selected
recentDropdown.onchange = () => {
  if (recentDropdown.value) fetchWeatherByCity(recentDropdown.value);
};

/* ================= API FETCH FUNCTIONS ================= */

// Fetch current weather using city name
async function fetchWeatherByCity(city) {
  try {
    clearError();

    // Save city to recent searches
    saveRecent(city);

    // Call OpenWeatherMap API
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    // Handle invalid city names
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();

    // Display current weather & forecast
    displayCurrentWeather(data);
    fetchForecast(data.coord.lat, data.coord.lon);
  } catch (err) {
    showError(err.message);
  }
}

// Fetch weather using latitude & longitude
async function fetchWeatherByCoords(lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  const data = await res.json();

  displayCurrentWeather(data);
  fetchForecast(lat, lon);
}

/* ================= DISPLAY CURRENT WEATHER ================= */

function displayCurrentWeather(data) {
  // Show weather sections
  currentWeather.classList.remove("hidden");
  forecastSection.classList.remove("hidden");

  // Store temperature for unit conversion
  currentTempC = data.main.temp;
  isCelsius = true;
  unitToggle.textContent = "°F";

  // Update UI with weather details
  cityNameEl.textContent = `${data.name} (${new Date().toLocaleDateString()})`;
  tempEl.textContent = `Temperature: ${currentTempC.toFixed(1)} °C`;
  windEl.textContent = `Wind: ${data.wind.speed} m/s`;
  humidityEl.textContent = `Humidity: ${data.main.humidity}%`;

  // Extract weather condition
  const condition = data.weather[0].main;
  conditionEl.textContent = condition;

  // Display icon, alerts & background
  weatherIcon.textContent = getIcon(condition, currentTempC);
  handleAlert(currentTempC);
  changeBackground(condition);
}

/* ================= WEATHER ICON LOGIC ================= */

// Returns emoji based on weather condition and temperature
function getIcon(condition, temp) {
  if (condition.includes("Rain")) return " 🌧️ ";
  if (condition.includes("Cloud")) return " ☁️";
  if (temp > 30) return "☀️";
  if (temp < 10) return "❄️";
  return "🌤️";
}

/* ================= TEMPERATURE UNIT TOGGLE ================= */

// Converts temperature between Celsius and Fahrenheit
function toggleTemp() {
  if (currentTempC === null) return;

  if (isCelsius) {
    tempEl.textContent = `Temperature: ${((currentTempC * 9) / 5 + 32).toFixed(1)} °F`;
    unitToggle.textContent = "°C";
  } else {
    tempEl.textContent = `Temperature: ${currentTempC.toFixed(1)} °C`;
    unitToggle.textContent = "°F";
  }

  isCelsius = !isCelsius;
}

/* ================= EXTREME WEATHER ALERT ================= */

// Displays alert when temperature exceeds safe limit
function handleAlert(temp) {
  if (temp > 40) {
    alertBox.classList.remove("hidden");
    alertBox.textContent = "⚠ Extreme Heat Alert!";
  } else {
    alertBox.classList.add("hidden");
  }
}

/* ================= BACKGROUND CHANGE ================= */

// Changes background based on weather condition
function changeBackground(condition) {
  if (condition.includes("Rain")) {
    body.className =
      "min-h-screen flex justify-center items-center p-4 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900";
  }
}

/* ================= 5-DAY FORECAST ================= */

// Fetches and displays forecast at 12:00 PM for next 5 days
async function fetchForecast(lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  const data = await res.json();

  forecastCards.innerHTML = "";

  // Filter only noon forecasts and limit to 5 days
  data.list
    .filter(i => i.dt_txt.includes("12:00:00"))
    .slice(0, 5)
    .forEach(day => {
      forecastCards.innerHTML += `
        <div class="bg-slate-700 text-white p-3 rounded text-center">
          <p class="font-semibold">${day.dt_txt.split(" ")[0]}</p>
          <p>🌡 ${day.main.temp} °C</p>
          <p>💨 ${day.wind.speed} m/s</p>
          <p>💧 ${day.main.humidity}%</p>
        </div>`;
    });
}

/* ================= RECENT SEARCHES (localStorage) ================= */

// Saves city names in localStorage
function saveRecent(city) {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];

  // Prevent duplicate entries
  if (!cities.includes(city)) cities.unshift(city);

  // Keep only last 5 searches
  cities = cities.slice(0, 5);

  localStorage.setItem("cities", JSON.stringify(cities));
  loadRecent();
}

// Loads recent searches into dropdown
function loadRecent() {
  const cities = JSON.parse(localStorage.getItem("cities")) || [];
  if (!cities.length) return;

  recentContainer.classList.remove("hidden");
  recentDropdown.innerHTML = "<option>Select city</option>";

  cities.forEach(c => {
    recentDropdown.innerHTML += `<option>${c}</option>`;
  });
}
loadRecent();

/* ================= ERROR HANDLING ================= */

// Displays error message
function showError(msg) {
  errorBox.textContent = msg;
  errorBox.classList.remove("hidden");
}

// Hides error message
function clearError() {
  errorBox.classList.add("hidden");
}
