import React, { useState } from 'react';
import MapComponent from "../components/MapComponent";

const Driver1 = () => {
  const [points, setPoints] = useState([]); // Array to store points from the MapComponent
  const [seats, setSeats] = useState(0); // Number of free seats input
  const [riderType, setRiderType] = useState('paid'); // Rider type selector (paid/free)

  // Function to handle points from MapComponent and set them in the parent (Driver1)
  const handlePointsUpdate = (newPoints) => {
    setPoints(newPoints); // Update the points array in Driver1
  };

  // Handle seat count change
  const handleSeatsChange = (e) => {
    setSeats(e.target.value);
  };

  // Handle rider type selection (Paid or Free)
  const handleRiderTypeChange = (e) => {
    setRiderType(e.target.value);
  };

  // Handle submit button click
  const handleSubmit = () => {
    // Prepare the data to be logged in the console
    const info = {
      points,
      seats,
      riderType,
    };

    // Log the submitted information to the console
    console.log("Submitted Information:", info);
  };

  return (
    <>
      <div>
        <h2>Driver Dashboard</h2>
        <MapComponent 
          initialCenter={[13.0843, 80.2705]} 
          initialZoom={13} 
          onPointsUpdate={handlePointsUpdate} // Pass the handler to MapComponent
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Driver Info:</h3>
        <div>
          <label>
            Free Seats:
            <input 
              type="number" 
              value={seats} 
              onChange={handleSeatsChange} 
              min="0" 
              max="10" // You can adjust the range as needed
            />
          </label>
        </div>

        <div style={{ marginTop: '10px' }}>
          <label>
            Rider Type:
            <select value={riderType} onChange={handleRiderTypeChange}>
              <option value="paid">Paid Rider</option>
              <option value="free">Free Rider</option>
            </select>
          </label>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>Selected Points:</h3>
          <ul>
            {points.map((point, index) => (
              <li key={index}>
                Point {index + 1}: Lat: {point.lat.toFixed(5)}, Lng: {point.lng.toFixed(5)}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button onClick={handleSubmit}>
            Submit Info
          </button>
        </div>
      </div>
    </>
  );
};

export default Driver1;
