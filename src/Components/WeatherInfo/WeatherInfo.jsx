import React, { useState, useEffect } from "react";
import styles from "./Style.module.css";


function WeatherInfo({ weatherData }) {
  const [tempClass, setTempClass] = useState('');
  const [expanded, setExpanded] = useState(false);
  const moreDetailsController = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    if (weatherData.main.temp_max >= 35) {
      setTempClass('hot');
    } else if (weatherData.main.temp_max <= 5) {
      setTempClass('cold');
    } else {
      setTempClass('comfortable');
    }
  }, [weatherData.main.temp_max]);

  return (
    <div className={styles.weatherContainer}>
      <div className={styles.weatherCondition}>
        <p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
            className={styles.weatherIcon}
          />
          <div className={styles.description}>
            {weatherData.weather[0].description}
          </div>
        </p>
      </div>
      <div className={styles.data}>
        <div className={styles.header}>
          <h1>
            {weatherData.name}, {weatherData.sys.country}
          </h1>
          <div className={styles.flagIconContainer}>
            <img
              src={`https://flagsapi.com/${weatherData.sys.country}/flat/64.png`}
              alt={`${weatherData.sys.country} flag`}
              className={styles.flagIcon}
            />
          </div>

        </div>

        <div className={styles.basicInfo} >
          <div
            className={`${styles.temperature} ${tempClass}`}
            style={{
              color: tempClass === 'cold' ? '#0051ff' : tempClass === 'hot' ? 'rgb(255, 38, 0)' : 'rgb(233, 229, 11)',
            }}
          >
            {weatherData.main.temp_max}°C
          </div>
          <div>
            <strong> Tốc độ gió:</strong> {weatherData.wind.speed} m/s
            <strong>. Mây:</strong> {weatherData.clouds.all}%
          </div>
        </div>

        <div className={styles.otherInfo} style={{ display: expanded ? 'block' : 'none' }}>
          <h3>Chi tiết khác:</h3>
          <ul>
            <li>
              <strong>Độ ẩm:</strong> {weatherData.main.humidity}%
            </li>
            <li>
              <strong>Áp suất:</strong> {weatherData.main.pressure} hPa
            </li>
            <li>
              <strong>Tọa độ:</strong> ({weatherData.coord.lat}, {weatherData.coord.lon})
            </li>
            <li>
              <strong>Thời gian mặt trời mọc:</strong> {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            </li>
            <li>
              <strong>Thời gian mặt trời lặn:</strong> {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </li>
            <li>
              <strong>Tầm nhìn:</strong> {weatherData.visibility / 1000} km
            </li>
          </ul>
        </div>
        <div>
          <button onClick={() => moreDetailsController()} className={styles.moreDetailsButton}>
            {expanded ? "Thu gọn" : "Mở rộng"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
