import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { fontGrid } from "@mui/material/styles/cssUtils";

const LocationPicker = ({ onLocationChange }) => {
  // const [position, setPosition] = useState([51.505, -0.09]); // Default location (London)

  const [position, setPosition] = useState([51.505, -0.09]); // Default location (London)
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch the user's current location
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setPosition([latitude, longitude]); // Set user's location
            setIsLoading(false); // Location fetched
          },
          (error) => {
            console.error("Error getting user location:", error);
            setIsLoading(false); // Use fallback location
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setIsLoading(false); // Use fallback location
      }
    };

    getUserLocation();
  }, []);

  // Function to fetch the address using Nominatim reverse geocoding
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name || "Address not found";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Address not available";
    }
  };

  // Custom component for adding GeoSearchControl
  // const SearchControl = () => {
  //   const map = useMap();
  //   const provider = new OpenStreetMapProvider();

  //   React.useEffect(() => {
  //     const searchControl = new GeoSearchControl({
  //       provider,
  //       style: "bar", // Search bar style
  //       showMarker: false, // Don't show markers by default
  //       autoClose: true, // Close results after selection
  //     });

  //     map.addControl(searchControl);

  //     const updateSearchBarValue = async (lat, lng) => {
  //       const address = await fetchAddress(lat, lng);
  //       const input = document.querySelector(
  //         ".leaflet-control-geosearch input"
  //       );
  //       if (input) {
  //         input.value = address;
  //       }
  //     };

  //     map.on("geosearch/showlocation", async (result) => {
  //       const { x: lng, y: lat } = result.location;
  //       setPosition([lat, lng]);
  //       await updateSearchBarValue(lat, lng); // Fetch and update search bar with address
  //       if (onLocationChange) onLocationChange([lat, lng]);
  //     });

  //     return () => {
  //       map.removeControl(searchControl);
  //       map.off("geosearch/showlocation");
  //     };
  //   }, [map]);

  //   return null;
  // };

  //NEW CODE
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

      const updateSearchBarValue = async (lat, lng) => {
        const address = await fetchAddress(lat, lng);
        const input = document.querySelector(
          ".leaflet-control-geosearch input"
        );
        if (input) {
          input.value = address; // Display the address in the search bar
        }
        return address; // Return the address
      };

      map.on("geosearch/showlocation", async (result) => {
        const { x: lng, y: lat } = result.location;
        setPosition([lat, lng]);
        const address = await updateSearchBarValue(lat, lng); // Fetch the address
        if (onLocationChange) onLocationChange([lat, lng, address]); // Send all three values
      });

      return () => {
        map.removeControl(searchControl);
        map.off("geosearch/showlocation");
      };
    }, [map]);

    return null;
  };

  // Handle map clicks
  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        const address = await fetchAddress(lat, lng);
        const input = document.querySelector(
          ".leaflet-control-geosearch input"
        );
        if (input) {
          input.value = address; // Update search input with the address
        }
        if (onLocationChange) onLocationChange([lat, lng, address]);
      },
    });
    return null;
  };

  if (isLoading) {
    return (
      <div style={{ fontFamily: "Poppins, sans-serif" }}>Loading map...</div>
    );
  }

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
