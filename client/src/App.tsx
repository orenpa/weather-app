import React from "react";
import "./App.css";
import WeatherApp from "./components/WeatherApp";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WeatherApp />} />
      </Routes>
    </div>
  );
}

export default App;
