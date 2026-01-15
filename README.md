# 🌤️ Weather Dashboard

A modern, responsive weather dashboard that provides real-time weather information and 5-day forecasts for any city worldwide. Built with HTML, Tailwind CSS, and vanilla JavaScript.

## 🔗 Project Links

- **Live Demo**: Not deployed (run index.html locally)
- **GitHub Repository**: https://github.com/Saad-Shams-dev/Weather-Forecast-Application

## ✨ Features

### Core Functionality
- 🌍 **Search by City**: Get weather for any city worldwide
- 📍 **Current Location**: Use geolocation to get weather at your location
- 🌡️ **Temperature Conversion**: Toggle between Celsius (°C) and Fahrenheit (°F)
- 📅 **5-Day Forecast**: View weather predictions for the next 5 days
- 📜 **Search History**: Quick access to recently searched cities (stored in localStorage)
- ⚠️ **Weather Alerts**: Notifications for extreme weather conditions (>40°C)
- 🎨 **Dynamic Backgrounds**: Background changes based on weather conditions

### Weather Information Displayed
- **Current Temperature** with unit conversion
- **Wind Speed** (meters per second)
- **Humidity** (percentage)
- **Weather Condition** (Clear, Rain, Clouds, etc.)
- **Visual Icons** (☀️, 🌧️, ☁️, ❄️, 🌤️)
- **Date & Time**

### User Experience
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Clean, modern Tailwind CSS interface
- ✅ Real-time API integration with OpenWeatherMap
- ✅ Error handling and user feedback
- ✅ Fast performance with async/await
- ✅ Persistent search history with localStorage

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Structure and semantic markup |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **JavaScript (ES6+)** | API calls, DOM manipulation, event handling |
| **OpenWeatherMap API** | Real-time weather data and forecasts |
| **Geolocation API** | Browser location services |
| **LocalStorage API** | Persist search history |

## 📁 Project Structure

```
weather-dashboard/
│
├── index.html          # Main HTML structure with Tailwind classes
├── script.js           # JavaScript logic and API integration
├── favicon.png         # Weather icon for browser tab
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API calls and Tailwind CDN)
- OpenWeatherMap API key (included, but you can use your own)

### Installation

1. **Clone the repository**
   ```bash
   git clone YOUR_GITHUB_REPOSITORY_LINK_HERE
   ```

2. **Navigate to project folder**
   ```bash
   cd weather-dashboard
   ```

3. **Open in browser**
   - Simply open `index.html` in your browser
   - Or use Live Server extension in VS Code for better development experience

### Getting Your Own API Key (Optional)

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Replace the API key in `script.js`:
   ```javascript
   const API_KEY = "YOUR_NEW_API_KEY_HERE";
   ```

## 📖 How to Use

### 1. Search by City Name
- Enter a city name in the input field (e.g., "Delhi", "London", "Tokyo")
- Click the **Search** button
- Weather information appears on the right panel

### 2. Use Current Location
- Click the **Use Current Location** button
- Allow browser location access when prompted
- Weather for your current coordinates is displayed

### 3. Convert Temperature Units
- Click the **°F** or **°C** button to toggle between units
- Temperature instantly converts without new API call

### 4. Access Recent Searches
- After searching cities, a dropdown menu appears
- Select any previous city for instant weather update
- Up to 5 recent searches are saved

### 5. View 5-Day Forecast
- Automatically displayed below current weather
- Shows temperature, wind speed, and humidity for 5 days
- Updates with each new search

## 🎨 Color Scheme

| Element | Color | Purpose |
|---------|-------|---------|
| Background | Blue-Cyan Gradient | Ocean/sky theme |
| Header | Sky Blue (#0284c7) | Professional branding |
| Search Button | Sky Blue | Primary action |
| Location Button | Indigo (#4338ca) | Secondary action |
| Weather Card | Dark Indigo (#1e1b4b) | High contrast display |
| Forecast Cards | Slate Gray (#334155) | Subtle differentiation |
| Alert Box | Red (#ef4444) | Urgent warnings |
| Toggle Button | Emerald (#059669) | Positive action |

## 🔧 API Endpoints Used

### Current Weather
```
GET https://api.openweathermap.org/data/2.5/weather
Parameters: q={city} or lat={lat}&lon={lon}
```

### 5-Day Forecast
```
GET https://api.openweathermap.org/data/2.5/forecast
Parameters: lat={lat}&lon={lon}
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px (stacked layout)
- **Tablet**: 640px - 1024px (stacked layout)
- **Desktop**: > 1024px (side-by-side layout)

### Layout Behavior
- **Mobile/Tablet**: Form and weather display stack vertically
- **Desktop**: Form on left (1/3 width), weather on right (2/3 width)
- **Forecast**: 1 column (mobile) → 2 columns (tablet) → 5 columns (desktop)

## 🎯 Key Features Explained

### Weather Icons
Icons change based on condition and temperature:
- ☀️ **Sunny**: Temperature > 30°C
- ❄️ **Cold**: Temperature < 10°C
- 🌧️ **Rain**: Rainy conditions
- ☁️ **Clouds**: Cloudy weather
- 🌤️ **Default**: Partly cloudy

### Dynamic Backgrounds
Background gradient changes with weather:
- **Rain**: Dark gray gradient
- **Default**: Blue-cyan gradient (can be extended)

### Temperature Conversion Formula
```javascript
Fahrenheit = (Celsius × 9/5) + 32
```

### Search History Logic
- Stores last 5 searched cities in localStorage
- Prevents duplicate entries
- Most recent search appears first

## ⚠️ Error Handling

The app handles these scenarios:
- ❌ Empty city input
- ❌ City not found (404 from API)
- ❌ Network errors
- ❌ Geolocation denied
- ❌ Invalid API responses

## 🌟 Future Enhancements

Potential features to add:
- [ ] Extended forecast (10-15 days)
- [ ] Hourly forecast view
- [ ] Weather maps integration
- [ ] Air quality index (AQI)
- [ ] UV index information
- [ ] Sunrise/sunset times
- [ ] More dynamic background themes
- [ ] Weather comparison between cities
- [ ] Export weather data as PDF
- [ ] Multi-language support

## 🐛 Known Issues

- Background only changes for rainy weather (can be extended)
- Alert only triggers for extreme heat (can add more alerts)
- Forecast fixed at noon (12:00 PM) data

## 🤝 Contributing

This is a learning project, but suggestions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes. Feel free to use and modify.

## 👨‍💻 Author

**Saad Shams**
- GitHub: [Saad-Shams-dev](https://github.com/Saad-Shams-dev/Weather-Forecast-Application.git)
- Email: saadshams163@gmail.com

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Styling powered by [Tailwind CSS](https://tailwindcss.com/)
- Icons: Native emoji support
- Inspired by modern weather applications

**Last Updated**: January 2026

Made with ❤️ and JavaScript

