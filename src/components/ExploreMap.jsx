import { Fragment, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getData } from "../utils/api";
import { Skeleton } from "antd";

const ExploreMap = () => {
  const [areas, setAreas] = useState([]); // Updated to store areas with clusters
  const [loading, setLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(10); // Initial zoom level

  const center = [-8.4095, 115.1889]; // Center of Bali

  useEffect(() => {
    getDataLocation();
  }, []);

  const getDataLocation = () => {
    setLoading(true);
    getData("/api/v1/location/read")
      .then((resp) => {
        console.log(resp);
        if (resp && resp.datas) {
          setAreas(resp.datas); // Store areas instead of locations
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }; 

  // Handle zoom change event
  const handleZoom = (e) => {
    const newZoom = e.target.getZoom();
    setZoomLevel(newZoom);
  };

  return (
    <Fragment>
      <div className="container">
        <p className="text-center mt-[100px]">Explore Clusters</p>
        <div style={{ width: "100%", height: "90vh" }}>
          {loading ? (
            <Skeleton active />
          ) : areas.length > 0 ? (
            <MapContainer
              center={center}
              zoom={zoomLevel}
              style={{ height: "100%", width: "100%" }}
              onzoom={handleZoom}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />

              {/* Draw circles around the clusters */}
              {areas.map((area, areaIndex) => (
                <Circle
                  key={areaIndex}
                  center={[area.lat, area.long]} // Coordinates of the cluster center
                  radius={area.radius} // Radius for each cluster
                  color="blue"
                  fillColor="blue"
                  fillOpacity={0.3}
                >
                  <Popup>
                    <span>{area.name}</span>
                  </Popup>
                </Circle>
              ))}

              {/* Markers for the locations inside each cluster */}
              {areas.map((area, areaIndex) =>
                area.locations.map((location, locIndex) => (
                  <Marker
                    key={`${areaIndex}-${locIndex}`} // Unique key for each marker
                    position={[
                      parseFloat(location.lat), // Convert lat from string to float
                      parseFloat(location.long), // Convert long from string to float
                    ]}
                  >
                    <Popup>
                      <span>{location.location}</span>
                    </Popup>
                  </Marker>
                ))
              )}
            </MapContainer>
          ) : (
            <p>No areas available.</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ExploreMap;
