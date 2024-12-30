import { useState, useEffect } from "react";
import './App.css';
import WeatherInfo from './Components/WeatherInfo/WeatherInfo';
import SearchBar from './Components/SearchBar/SearchBar';
import Error from "./Components/Error/Error";

function App() {
  const [appStatus, setAppStatus] = useState(200);
  const [weatherData, setWeatherData] = useState(null);
  const getCurrentCityWeather = async () => {
    try {
      setAppStatus("processing");
      const response = await fetch(`https://ipinfo.io/json`);
      const res = await response.json();
      const city = res.city;
      const response1 = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8fd6e81563027d212a915951fde0ba68&units=metric`
      );
      const weatherData = await response1.json();
      setWeatherData(weatherData);
      setAppStatus(200);
    } catch (error) {
      setAppStatus(error.message);
    }
  };

  useEffect(() => {
    getCurrentCityWeather();
  }, []);

  return (
    <div>
      <SearchBar updateWeatherData={setWeatherData} updateAppStatus={setAppStatus} />
      {appStatus === 200 && weatherData ? (
        <WeatherInfo weatherData={weatherData} />
      ) : (
        <Error appStatus={appStatus} updateAppStatus={setAppStatus} />
      )}
    </div>
  );
}

export default App;
