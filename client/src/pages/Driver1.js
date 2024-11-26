// import React, { useState } from 'react';
// import MapComponent from "../components/MapComponent";

// const Driver1 = () => {
//   const [points, setPoints] = useState([]); // Array to store points from the MapComponent
//   const [seats, setSeats] = useState(0); // Number of free seats input
//   const [riderType, setRiderType] = useState('paid'); // Rider type selector (paid/free)

//   // Function to handle points from MapComponent and set them in the parent (Driver1)
//   const handlePointsUpdate = (newPoints) => {
//     setPoints(newPoints); // Update the points array in Driver1
//   };

//   // Handle seat count change
//   const handleSeatsChange = (e) => {
//     setSeats(e.target.value);
//   };

//   // Handle rider type selection (Paid or Free)
//   const handleRiderTypeChange = (e) => {
//     setRiderType(e.target.value);
//   };

//   // Handle submit button click
//   const handleSubmit = () => {
//     // Prepare the data to be logged in the console
//     const info = {
//       points,
//       seats,
//       riderType,
//     };

//     // Log the submitted information to the console
//     console.log("Submitted Information:", info);
//   };

//   return (
//     // <>
//     //   <div>
//     //     <h2>Driver Dashboard</h2>
//     //     <MapComponent 
//     //       initialCenter={[13.0843, 80.2705]} 
//     //       initialZoom={13} 
//     //       onPointsUpdate={handlePointsUpdate} // Pass the handler to MapComponent
//     //     />
//     //   </div>

//     //   <div style={{ marginTop: '20px' }}>
//     //     <h3>Driver Info:</h3>
//     //     <div>
//     //       <label>
//     //         Free Seats:
//     //         <input 
//     //           type="number" 
//     //           value={seats} 
//     //           onChange={handleSeatsChange} 
//     //           min="0" 
//     //           max="10" // You can adjust the range as needed
//     //         />
//     //       </label>
//     //     </div>

//     //     <div style={{ marginTop: '10px' }}>
//     //       <label>
//     //         Rider Type:
//     //         <select value={riderType} onChange={handleRiderTypeChange}>
//     //           <option value="paid">Paid Rider</option>
//     //           <option value="free">Free Rider</option>
//     //         </select>
//     //       </label>
//     //     </div>

//     //     <div style={{ marginTop: '20px' }}>
//     //       <h3>Selected Points:</h3>
//     //       <ul>
//     //         {points.map((point, index) => (
//     //           <li key={index}>
//     //             Point {index + 1}: Lat: {point.lat.toFixed(5)}, Lng: {point.lng.toFixed(5)}
//     //           </li>
//     //         ))}
//     //       </ul>
//     //     </div>

//     //     <div style={{ marginTop: '20px' }}>
//     //       <button onClick={handleSubmit}>
//     //         Submit Info
//     //       </button>
//     //     </div>
//     //   </div>
//     // </>
//     <div className="min-h-screen bg-background dark:bg-gray-900 text-white p-4">
//       <h2 className="text-3xl font-bold text-primary text-center mb-6">
//         Driver Dashboard
//       </h2>
//       <div className="flex flex-col lg:flex-row lg:space-x-8">
//         {/* Map Section */}
//         <div className="flex-1">
//           <MapComponent
//             initialCenter={[13.0843, 80.2705]}
//             initialZoom={13}
//             onPointsUpdate={handlePointsUpdate} // Pass the handler to MapComponent
//           />
//         </div>

//         {/* Driver Info Section */}
//         <div className="flex-1 bg-secondary dark:bg-gray-800 p-6 rounded-lg shadow-lg">
//           <h3 className="text-2xl font-semibold mb-4">Driver Info</h3>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">
//               Free Seats:
//             </label>
//             <input
//               type="number"
//               value={seats}
//               onChange={handleSeatsChange}
//               min="0"
//               max="10"
//               className="w-full p-2 border border-gray-700 dark:border-gray-600 rounded bg-gray-800 dark:bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">
//               Rider Type:
//             </label>
//             <select
//               value={riderType}
//               onChange={handleRiderTypeChange}
//               className="w-full p-2 border border-gray-700 dark:border-gray-600 rounded bg-gray-800 dark:bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
//             >
//               <option value="paid">Paid Rider</option>
//               <option value="free">Free Rider</option>
//             </select>
//           </div>

//           <div className="mb-6">
//             <h3 className="text-xl font-semibold mb-2">Selected Points:</h3>
//             <ul className="list-disc list-inside space-y-2">
//               {points.map((point, index) => (
//                 <li key={index} className="text-sm">
//                   Point {index + 1}: Lat: {point.lat.toFixed(5)}, Lng:{" "}
//                   {point.lng.toFixed(5)}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <button
//             onClick={handleSubmit}
//             className="w-full p-2 bg-primary hover:bg-green-600 text-white font-bold rounded shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//           >
//             Submit Info
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Driver1;

import React, { useState } from "react";
import MapComponent from "../components/MapComponent";

const Driver1 = () => {
  const [points, setPoints] = useState([]); // Array to store points from the MapComponent
  const [seats, setSeats] = useState(0); // Number of free seats input
  const [riderType, setRiderType] = useState("paid"); // Rider type selector (paid/free)

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
            <option value="paid">Paid Rider</option>
            <option value="free">Free Rider</option>
          </select>
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





