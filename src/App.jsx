import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");

  const calcBmi = (e) => {
    e.preventDefault();

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) * 0.3048; // Convert height from feet to meters

    if (heightNum <= 0 || heightNum > 2.4384) {
      alert("Please enter a valid height between 0 and 8 feet.");
      return;
    }

    if (!weightNum || weightNum <= 0) {
      alert("Please enter a valid weight greater than 0.");
      return;
    }

    const bmiValue = weightNum / (heightNum * heightNum);
    setBmi(bmiValue.toFixed(2));

    if (bmiValue < 18.5) {
      setMessage("You are underweight...");
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setMessage("Your weight is normal...");
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setMessage("You are overweight...");
    } else {
      setMessage("You are obese...");
    }
  };

  const reload = () => {
    window.location.reload();
  };

  return (
    <div id="container">
      <h2>BMI Calculator</h2>
      <form onSubmit={calcBmi}>
        <div>
          <label htmlFor="Weight">Weight (kg)</label>
          <input
            type="number"
            id="Weight"
            placeholder="Enter your Weight:"
            value={weight}
            required
            onChange={(event) => setWeight(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="height">Height (ft)</label>
          <input
            type="number"
            id="height"
            placeholder="Enter your Height:"
            value={height}
            required
            onChange={(event) => setHeight(event.target.value)}
          />
        </div>
        <div>
          <button className="btn" type="submit">
            Submit
          </button>
          <button className="btn btn-outline" type="button" onClick={reload}>
            Reload
          </button>
        </div>
        <div className="centre">
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
      </form>
    </div>
  );
};

export default App;
