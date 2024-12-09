import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

const LocationPicker = ({ onLocationChange }) => {
  const [position, setPosition] = useState([51.505, -0.09]); // Default location (London)

  // Custom component for adding GeoSearchControl
  const SearchControl = () => {
    const map = useMap();
    const provider = new OpenStreetMapProvider();

    React.useEffect(() => {
      const searchControl = new GeoSearchControl({
        provider,
        style: "bar", // Search bar style
        showMarker: false, // Don't show markers by default
        autoClose: true, // Close results after selection
      });

      map.addControl(searchControl);

      map.on("geosearch/showlocation", (result) => {
        const { x: lng, y: lat } = result.location;
        setPosition([lat, lng]);
        if (onLocationChange) onLocationChange([lat, lng]);
      });

      return () => map.removeControl(searchControl);
    }, [map]);

    return null;
  };

  // Handle map clicks
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const newPosition = [e.latlng.lat, e.latlng.lng];
        setPosition(newPosition);
        if (onLocationChange) onLocationChange(newPosition);
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={position} />
      <SearchControl />
      <MapClickHandler />
    </MapContainer>
  );
};

export default LocationPicker;
