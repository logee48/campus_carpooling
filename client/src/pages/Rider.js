import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Default icon setup
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function Rider() {
  const [riderLocation, setRiderLocation] = useState(null);
  const [nearestDriver, setNearestDriver] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [minDistance, setMinDistance] = useState(null); // Track minDistance in state

  // Load driver data from MongoDB (mocked here as a fetch from an API)
  useEffect(() => {
    const fetchDrivers = async () => {
      const response = await fetch("http://localhost:1234/drivers"); // API endpoint to get driver data
      const data = await response.json();
      setDrivers(data.drivers); // Assuming the response structure includes { drivers: [...] }
    };
    fetchDrivers();
  }, []);

  // Calculate nearest driver using Haversine formula
  const findNearestDriver = () => {
    if (!riderLocation) {
      alert("Please select your location on the map first.");
      return;
    }

    let minDist = Infinity;
    let nearest = null;

    drivers.forEach((driver) => {
      driver.points.forEach((point) => {
        const distance = getDistanceFromLatLonInKm(
          riderLocation.lat,
          riderLocation.lng,
          point.lat,
          point.lng
        );
        if (distance < minDist) {
          minDist = distance;
          nearest = { ...driver, lat: point.lat, lng: point.lng };
        }
      });
    });

    setNearestDriver(nearest);
    setMinDistance(minDist); // Save the minDistance in state
  };

  // Function to calculate distance between two lat/lng points
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg) => deg * (Math.PI / 180);

  // Map click event to set rider location
  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setRiderLocation({ lat, lng });
      },
    });

    return riderLocation ? (
      <Marker
        position={[riderLocation.lat, riderLocation.lng]}
        icon={defaultIcon}
        draggable={true}
        eventHandlers={{
          dragend(e) {
            const { lat, lng } = e.target.getLatLng();
            setRiderLocation({ lat, lng }); // Update the rider location when dragging ends
            findNearestDriver(); // Recalculate nearest driver after dragging
          },
        }}
      >
        <Popup>Your Location</Popup>
      </Marker>
    ) : null;
  }

  return (
    <div className="rider-page">
      <h2>Find a Driver</h2>
      <MapContainer center={[13.0843, 80.2705]} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
        {nearestDriver && (
          <Marker position={[nearestDriver.lat, nearestDriver.lng]} icon={defaultIcon}>
            <Popup>Nearest Driver: {nearestDriver.driverId}</Popup>
          </Marker>
        )}
      </MapContainer>

      <button onClick={findNearestDriver} style={{ marginTop: "10px", padding: "8px 16px" }}>
        Find Nearest Driver
      </button>

      {nearestDriver && (
        <div className="driver-details" style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
          <h3>Nearest Driver Details</h3>
          <p><strong>Driver ID:</strong> {nearestDriver.driverId}</p>
          <p><strong>Location:</strong> {nearestDriver.lat}, {nearestDriver.lng}</p>
          <p><strong>Free Seats:</strong> {nearestDriver.freeSeats}</p>
          <p><strong>Rider Type:</strong> {nearestDriver.riderType}</p>
          <p><strong>Preferences:</strong> {nearestDriver.preferencing}</p>
          <p><strong>Distance from you:</strong> {minDistance !== null ? minDistance.toFixed(2) : "Calculating..."} km</p>
        </div>
      )}
    </div>
  );
}

export default Rider;
