import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");
  const [unit, setUnit] = useState("metric");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("ft");

  const calcBmi = (e) => {
    e.preventDefault();

    let bmiValue;

    if (unit === "metric") {
      const weightNum = parseFloat(weight);
      const heightNum = parseFloat(height * 0.3048);

      if (!weightNum || weightNum <= 0) {
        alert("Please enter a valid weight greater than 0.");
        return;
      }
      if (heightNum <= 0 || heightNum > 2.5) {
        alert("Please enter a valid height between 0 and 8 foot.");
        return;
      }

      bmiValue = weightNum / (heightNum * heightNum);
    } else if (unit === "imperial") {
      const weightNum = parseFloat(weight);
      const heightNum = parseFloat(height);

      if (!weightNum || weightNum <= 0) {
        alert("Please enter a valid weight greater than 0.");
        return;
      }
      if (heightNum <= 0 || heightNum > 96) {
        alert("Please enter a valid height between 0 and 96 inches.");
        return;
      }

      bmiValue = (weightNum / (heightNum * heightNum)) * 703;
    }

    setBmi(bmiValue.toFixed(2));

    if (bmiValue < 18.5) {
      setMessage(
        "You are underweight.Consider gaining weight by increasing your calorie intake with healthy foods like nuts, dairy, and whole grains."
      );
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setMessage(
        "Your weight is within the normal range. Keep up the good work with a balanced diet and regular exercise!"
      );
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setMessage(
        "You are overweight. Consider losing weight through a combination of a healthy diet and regular physical activity."
      );
    } else {
      setMessage(
        "You are in the obese category. It's important to focus on weight loss through a structured diet and exercise plan. Consult a healthcare professional for guidance."
      );
    }
  };

  const handleUnitChange = (event) => {
    const selectedUnit = event.target.value;
    setUnit(selectedUnit);

    if (selectedUnit === "metric") {
      setWeightUnit("kg");
      setHeightUnit("ft");
    } else if (selectedUnit === "imperial") {
      setWeightUnit("lbs");
      setHeightUnit("in");
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
          <label>
            Select Unit:
            <select name="unit" value={unit} onChange={handleUnitChange}>
              <option value="metric">Metric</option>
              <option value="imperial">Imperial</option>
            </select>
          </label>
        </div>

        <div>
          <label htmlFor="weight">Weight ({weightUnit})</label>
          <input
            type="number"
            id="weight"
            placeholder="Enter your Weight"
            value={weight}
            required
            onChange={(event) => setWeight(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="height">Height ({heightUnit})</label>
          <input
            type="number"
            id="height"
            placeholder="Enter your Height"
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
