import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import default marker icon for leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = new L.Icon({ 
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapComponent({ initialCenter = [51.505, -0.09], initialZoom = 13, onPointsUpdate }) {
  const [points, setPoints] = useState([]);
  const mapRef = useRef(null); // Reference to the map instance

  // Component to handle clicks and add markers
  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPoints((prevPoints) => {
          const newPoints = [...prevPoints, { lat, lng }];
          return newPoints;
        });
      },
    });

    return (
      <>
        {points.map((point, index) => (
          <Marker
            key={index}
            position={[point.lat, point.lng]}
            icon={defaultIcon}
            draggable
            eventHandlers={{
              dragend: (event) => {
                const marker = event.target;
                const position = marker.getLatLng();
                setPoints((prevPoints) =>
                  prevPoints.map((p, i) =>
                    i === index ? { lat: position.lat, lng: position.lng } : p
                  )
                );
              },
            }}
          >
            <Popup>{`Point ${index + 1}`}</Popup>
          </Marker>
        ))}
      </>
    );
  }

  // Use effect to send points update to the parent component
  useEffect(() => {
    // Ensure that the parent is updated with new points after render
    onPointsUpdate(points);
  }, [points, onPointsUpdate]); // Trigger when points change

  return (
    <MapContainer
      center={initialCenter}
      zoom={initialZoom}
      style={{ height: '400px', width: '100%' }}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
}

export default MapComponent;
