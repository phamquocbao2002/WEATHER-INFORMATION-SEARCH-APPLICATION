import React, { createContext, useState } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({
      coord: {
        lon: -0.1257,
        lat: 51.5085
      },
      weather: [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      base: "stations",
      main: {
        "temp": 279.38,
        "feels_like": 278.71,
        "temp_min": 278.73,
        "temp_max": 280.25,
        "pressure": 1035,
        "humidity": 95,
        "sea_level": 1035,
        "grnd_level": 1032
      },
      visibility: 10000,
      wind: {
        "speed": 1.34,
        "deg": 119,
        "gust": 1.79
      },
      clouds: {
        "all": 100
      },
      dt: 1735205298,
      sys: {
        "type": 2,
        "id": 2075535,
        "country": "GB",
        "sunrise": 1735200348,
        "sunset": 1735228587
      },
      timezone: 0,
      id: 2643743,
      name: "London",
      cod: 200
    });

  return (
    <StateContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </StateContext.Provider>
  );
};
