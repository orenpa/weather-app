import React from "react";
import "../styles/CityNotFound.css";
import NotFound from "./assets/NotFound.png";
interface CityNotFoundProps {
  show: boolean;
  onReturnHome: () => void;
}

const CityNotFound = (props: CityNotFoundProps) => {
  const { show, onReturnHome } = props;
  if (!show) return null;

  return (
    <div className="alert-container">
      <div className="alert-box">
        <h2>City Not Found</h2>
        <img src={NotFound} alt="City Not Found" />
        <button onClick={onReturnHome}>Return to Home Page</button>
      </div>
    </div>
  );
};

export default CityNotFound;
