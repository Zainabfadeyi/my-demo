import React, { useEffect, useState } from "react";
import styles from "../../../styles/weather.module.css";

const api = {
  key: "6b7489d54fcdb3de51b1c63d7505c898",
  base: "https://api.openweathermap.org/data/2.5/",
};

interface Weather {
  name?: string;
  main?: {
    temp: number;
  };
  weather?: {
    main: string;
    description: string;
  }[];
}

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<Weather>({});
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchWeather = (latitude: number, longitude: number) => {
      fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.cod === 200) {
            setWeather(result);
            setError("");
          } else {
            setError("Failed to fetch weather data");
          }
        })
        .catch(() => {
          setError("Failed to fetch weather data");
        });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setError("User denied the request for Geolocation. Please allow location access.");
              break;
            case err.POSITION_UNAVAILABLE:
              setError("Location information is unavailable.");
              break;
            case err.TIMEOUT:
              setError("The request to get user location timed out.");
              break;
            default:
              setError("An unknown error occurred.");
              break;
          }
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className={styles.app}>
        <div className={styles.title}>Weather</div>
      <div className={styles.appHeader}>
        
        <div>
        {error && <p className={styles.error}>{error}</p>}

        {weather.main && weather.weather ? (
            <div className={styles.mainWeather}>
          <div className={styles.weatherData}>
            <div className={styles.location}>{weather.name}</div>
            <div className={styles.condition}>{weather.weather[0].main}</div>
            <div className={styles.description}>({weather.weather[0].description})</div>
          </div>
          <div className={styles.temp}>{weather.main.temp}°C</div>
          </div>
        ) : (
          !error && <p className={styles.loading}>Loading weather data...</p>
        )}
        </div>
      </div>
    </div>
  );
};

export default Weather;

