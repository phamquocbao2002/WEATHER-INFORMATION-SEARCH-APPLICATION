import React, { useState, useEffect } from 'react';
import styles from './Style.module.css';


function SearchBar({ updateWeatherData, updateAppStatus}) {
  const [city, setCity] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch('/city.list.json')
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error('Error loading city list:', error));
  }, []);


  const getCitiesByName = async (cityName) => {
    const lowerCaseName = cityName.toLowerCase();
    return cities
      .filter(city => city.name.toLowerCase().includes(lowerCaseName))
      .slice(0, 10);
  };

  const enterCity = async (event) => {
    const cityName = event.target.value;
    setCity(cityName);
    setSearchResults([]);
    if (cityName.trim() !== '') {
      const results = await getCitiesByName(cityName);
      if (event.key === 'Enter') {
        search();
      } else {
        setSearchResults(results);
      }
    } else {
      setSearchResults([]);
    }

  };

  const search = async () => {
    setSearchResults([]);
    try {
      updateAppStatus("processing");
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8fd6e81563027d212a915951fde0ba68&units=metric`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      updateWeatherData(data);
      updateAppStatus(response.status);

    } catch (error) {
      updateAppStatus(error.message);
    }
  };

  const handleCitySelection = (selectedCity) => {
    setCity(selectedCity.name);
    setSearchResults([]);
    updateAppStatus("processing");
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity.name}&appid=8fd6e81563027d212a915951fde0ba68&units=metric`)
        .then(response => {
            updateAppStatus(response.ok ? 200 : response.status);
            return response.json();
        })
        .then(data => {
            if (data) {
                updateWeatherData(data);
            }
        })
        .catch(error => {
            updateAppStatus(error.message);
        });
};

  return (
    <div className={styles.searchBarContainer}>
      <div>
        <input
          type="text"
          placeholder="Nhập thành phố cần tìm"
          value={city}
          onChange={(e) => enterCity(e)}
          onKeyDown={(e) => enterCity(e)}
          className={styles.searchInput}
        />
        <button onClick={() => search()} className={styles.searchButton}>
          Tìm kiếm
        </button>
      </div>
      <div className={styles.searchResults} style={{ display: searchResults.length === 0 ? 'none' : 'block' }}>
        {searchResults.map((result, index) => (
          <div
            key={index}
            onClick={() => handleCitySelection(result)}
            className={styles.searchResultItem}
          >
            {result.name}, {result.country}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
