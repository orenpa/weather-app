import { ChangeEvent, useCallback, useEffect, useState } from "react";
import "./WeatherApp.css";

import search_icon from "../assets/search.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import clear_icon from "../assets/clear.png";
import humidity_icon from "../assets/humidity.png";
import snow_icon from "../assets/snow.png";
import rain_icon from "../assets/rain.png";
import wind_icon from "../assets/wind.png";
import axios from "axios";
import { City } from "../../types/CityType";

const WeatherApp = () => {
  const [wicon, setWicon] = useState(cloud_icon);
  const [cities, setCities] = useState<City[]>([]);
  const [humiditiy, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [temp, setTemp] = useState("");
  const [input, setInput] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [searchFlag, setSearchFlag] = useState(false);
  const maxReults = 20;

  //get cities data
  const fetchCities = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000");
      console.log("fetchCities: ", response.data);
      setCities(response.data);
    } catch (error) {
      console.log("Fetch Cities Error", error);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const search = async (searchedValue: string) => {
    if (searchedValue.length) {
      try {
        const response = await axios.post("http://localhost:5000/api/proxy", {
          city: searchedValue,
        });
        console.log(response.data);

        setHumidity(response.data.main.humidity + "%");
        setWindSpeed(response.data.wind.speed.toFixed(1) + " km/h");
        setTemp(Math.floor(response.data.main.temp) + "°c");
        setCity(response.data.name);

        if (
          response.data.weather[0].icon === "01d" ||
          response.data.weather[0].icon === "01n"
        ) {
          setWicon(clear_icon);
        } else if (
          response.data.weather[0].icon === "02d" ||
          response.data.weather[0].icon === "02n"
        ) {
          setWicon(cloud_icon);
        } else if (
          response.data.weather[0].icon === "03d" ||
          response.data.weather[0].icon === "03n"
        ) {
          setWicon(drizzle_icon);
        } else if (
          response.data.weather[0].icon === "04d" ||
          response.data.weather[0].icon === "04n"
        ) {
          setWicon(drizzle_icon);
        } else if (
          response.data.weather[0].icon === "09d" ||
          response.data.weather[0].icon === "09n"
        ) {
          setWicon(rain_icon);
        } else if (
          response.data.weather[0].icon === "10d" ||
          response.data.weather[0].icon === "10n"
        ) {
          setWicon(rain_icon);
        } else if (
          response.data.weather[0].icon === "13d" ||
          response.data.weather[0].icon === "13n"
        ) {
          setWicon(snow_icon);
        } else {
          setWicon(clear_icon);
        }
      } catch (error) {
        console.error("There was an error!", error);
      }
    }
  };

  const handleCitySelect = (cityName: string) => {
    setInput(cityName);
    setSearchFlag(false);
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setSearchFlag(true);
    const newInput = event.target.value;
    setInput(newInput);
  }

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          className="cityInput"
          placeholder="Search"
          autoComplete="off"
        />
        <div
          className="search-icon"
          onClick={() => {
            search(input);
          }}
        >
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="result-box">
        {searchFlag &&
          input &&
          cities
            .filter((item) => {
              const searchTerm = input.toLowerCase();
              const cityName = item.name.toLowerCase();
              return cityName.includes(searchTerm);
            })
            .slice(0, maxReults)
            .map((item: City, index: number) => (
              <div
                key={index}
                className="result-box-row"
                onClick={() => handleCitySelect(item.name)}
              >
                {item.name}
              </div>
            ))}
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">{temp}</div>
      <div className="weather-location">{city}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humiditiy}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">{windSpeed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
