import React, { useState } from "react";
import MapComponent from "../components/MapComponent";

const Driver1 = () => {
  const [points, setPoints] = useState([]); // Array to store points from the MapComponent
  const [seats, setSeats] = useState(0); // Number of free seats input
  const [riderType, setRiderType] = useState("paid"); // Rider type selector (paid/free)
  const [pref, setPref] = useState([]); // Preferences for multi-selector
  const [inputValue, setInputValue] = useState(""); // Input value for the preferences
  const [message, setMessage] = useState(""); // To display success or error message

  // Predefined options for the multi-select input
  const options = ["dog", "cat", "football", "cricket", "politics"];

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

  // Handle input change in the multi-select field
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle adding new preference (either existing or new one)
  const handlePrefChange = (selectedOption) => {
    if (!pref.includes(selectedOption)) {
      setPref([...pref, selectedOption]);
    }
    setInputValue(""); // Clear input after selection
  };

  // Handle removing selected preference
  const handleRemoveOption = (optionToRemove) => {
    setPref(pref.filter(option => option !== optionToRemove));
  };

  // Handle the submit button click
  const handleSubmit = async () => {
    const driverData = {
      driverId: 1111,
      points,
      freeSeats: seats,
      riderType,
      preferencing: pref,
    };

    try {
      // Send the data to the server
      const response = await fetch("http://localhost:1234/add-driver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driverData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Driver data added successfully!");
      } else {
        setMessage(`Error: ${result.message || "Failed to add driver"}`);
      }
    } catch (error) {
      console.error("Error submitting driver data:", error);
      setMessage("Error submitting driver data.");
    }
  };

  // Filter options based on input value (to show recommendations)
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(inputValue.toLowerCase()) && !pref.includes(option)
  );

  return (
    <div className="min-h-screen relative">
      {/* Upper Half: Map */}
      <div className="h-1/2">
        <MapComponent
          initialCenter={[13.0843, 80.2705]}
          initialZoom={13}
          onPointsUpdate={handlePointsUpdate} // Pass the handler to MapComponent
          className="w-full h-full"
        />
      </div>

      {/* Lower Half: Form */}
      <div className="absolute top-1/2 left-0 right-0 bg-secondary dark:bg-gray-800 p-6 rounded-t-3xl shadow-lg z-10">
        <h3 className="text-2xl font-semibold mb-4 text-center text-primary">
          Create a Ride
        </h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white mb-2">Free Seats:</label>
          <input
            type="number"
            value={seats}
            onChange={handleSeatsChange}
            min="0"
            max="10"
            className="w-full p-2 border border-gray-700 dark:border-gray-600 rounded bg-gray-800 dark:bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-white mb-2">Rider Type:</label>
          <select
            value={riderType}
            onChange={handleRiderTypeChange}
            className="w-full p-2 border border-gray-700 dark:border-gray-600 rounded bg-gray-800 dark:bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="paid">Shared Cost</option>
            <option value="free">Free Ride</option>
          </select>
        </div>

        {/* Multi-Select Preferences with Recommendations */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-white mb-2">Preferences:</label>
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-700 dark:border-gray-600 rounded bg-gray-800 dark:bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Type to search or create a preference..."
            />

            {/* Show filtered recommendations */}
            {inputValue && (
              <ul className="absolute left-0 right-0 mt-1 bg-gray-800 dark:bg-gray-700 border border-gray-600 rounded-md max-h-40 overflow-auto z-10">
                {filteredOptions.map((option, index) => (
                  <li
                    key={index}
                    className="p-2 text-white cursor-pointer hover:bg-gray-700"
                    onClick={() => handlePrefChange(option)}
                  >
                    {option}
                  </li>
                ))}
                {filteredOptions.length === 0 && (
                  <li
                    className="p-2 text-white cursor-pointer hover:bg-gray-700"
                    onClick={() => handlePrefChange(inputValue)}
                  >
                    Create new option: "{inputValue}"
                  </li>
                )}
              </ul>
            )}

            {/* Display selected preferences like tags with cross for removal */}
            <div className="flex flex-wrap gap-2 mt-2">
              {pref.map((selectedOption, index) => (
                <span
                  key={index}
                  className="bg-primary hover:bg-green-600 text-white px-2 py-1 rounded flex items-center"
                >
                  {selectedOption}
                  <span
                    className="ml-2 cursor-pointer"
                    onClick={() => handleRemoveOption(selectedOption)}
                  >
                    &times;
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-white">Selected Points:</h3>
          <ul className="list-disc list-inside space-y-2 text-white">
            {points.map((point, index) => (
              <li key={index} className="text-sm">
                Point {index + 1}: Lat: {point.lat.toFixed(5)}, Lng:{" "}
                {point.lng.toFixed(5)}
              </li>
            ))}
          </ul>
        </div>

        {/* Message after form submission */}
        {message && (
          <div className="text-center text-white mb-4">
            <p>{message}</p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full p-2 bg-primary hover:bg-green-600 text-white font-bold rounded shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Submit Info
        </button>
      </div>
    </div>
  );
};

export default Driver1;
