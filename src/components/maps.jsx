// import { Fragment, useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polygon, Circle } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// // import L from "leaflet";
// import { getData } from "../utils/api";
// import { Skeleton } from "antd";

// // Locations and their coordinates
// const locations = [
//   { name: "Denpasar", lat: "-8.6500", long: "115.2167" },
//   { name: "Ubud", lat: "-8.5069", long: "115.2620" },
//   { name: "Seminyak", lat: "-8.6919", long: "115.1657" },
//   { name: "Kuta", lat: "-8.7482", long: "115.1707" },
//   { name: "Nusa Dua", lat: "-8.8034", long: "115.2255" },
//   { name: "Canggu", lat: "-8.6333", long: "115.0850" },
//   { name: "Sanur", lat: "-8.6900", long: "115.2600" },
//   { name: "Lovina", lat: "-8.2081", long: "115.0867" },
//   { name: "Amed", lat: "-8.3269", long: "115.6297" },
//   { name: "Jimbaran", lat: "-8.7171", long: "115.1695" },
// ];

// // Center of the map (Optional, you can use a global Bali center as fallback)
// const center = [-8.4095, 115.1889]; // Center of Bali
// const ExploreMap = () => {
//   // const { isLoaded } = useLoadScript({
//   //   googleMapsApiKey: GOOGLE_MAP_API_KEY,
//   // });

//   // const [activeMarker, setActiveMarker] = useState(null);

//   // const handleActiveMarker = (marker) => {
//   //   if (marker == activeMarker) {
//   //     return;
//   //   }
//   //   setActiveMarker(marker);
//   // };

//   const [locations, setLocations] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Example data using Longitude and Latitude
//   useEffect(() => {
//     getDataLocation();
//   }, []);

//   const getDataLocation = () => {
//     setLoading(true);
//     getData("/api/v1/location/read")
//       .then((resp) => {
//         console.log(resp);
//         if (resp && resp.datas) {
//           setLocations(resp.datas);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   };

//   // const polygonCoordinates = locations.map((location) => [
//   //   parseFloat(location.lat),
//   //   parseFloat(location.long),
//   // ]);

//     // Define radius in meters (10 km for example)
//     const radius = 1000; // 10 kilometers

//   return (
    
//     // <Fragment>
//     //   <div className="container">
//     //     <p className="text-center mt-[100px]">aaaaf</p>
//     //     <div style={{ width: "100%", height: "90vh" }}>
//     //       {isLoaded ? (
//     //         <GoogleMap
//     //           center={{
//     //             lat: -8.65,
//     //             lng: 115.2167,
//     //           }}
//     //           zoom={13}
//     //           onClick={() => setActiveMarker(null)}
//     //           mapContainerStyle={{
//     //             width: "100%",
//     //             height: "90vh",
//     //           }}
//     //         >
//     //           {/* Markers here */}
//     //           {markers.map(({ id, name, position }) => (
//     //             <MarkerF
//     //               key={id}
//     //               position={position}
//     //               onClick={() => handleActiveMarker(id)}
//     //             >
//     //               {activeMarker === id ? (
//     //                 <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
//     //                   <div>
//     //                     <p>{name}</p>
//     //                   </div>
//     //                 </InfoWindowF>
//     //               ) : null}
//     //             </MarkerF>
//     //           ))}
//     //         </GoogleMap>
//     //       ) : null}
//     //     </div>
//     //   </div>
//     // </Fragment>
//     <>
//       <Fragment>
//         <div className="container">
//           <p className="text-center mt-[100px]">aaaaf</p>
//           <div style={{ width: "100%", height: "90vh" }}>
//             {loading ? (
//               <Skeleton active />
//             ) : locations.length > 0 ? (
//               <MapContainer
//                 center={center}
//                 zoom={10}
//                 style={{ height: "100%", width: "100%" }}
//               >
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
//                 />

//                 {/* Draw circles around each location */}
//                 {locations.map((location, index) => (
//                   <Circle
//                     key={index}
//                     center={[
//                       parseFloat(location.lat),
//                       parseFloat(location.long),
//                     ]} // Coordinates of the location
//                     radius={radius} // Radius in meters (10 km)
//                     color="blue"
//                     fillColor="blue"
//                     fillOpacity={0.3}
//                   >
//                     <Popup>
//                       <span>{location.name}</span> {/* Display location name */}
//                     </Popup>
//                   </Circle>
//                 ))}

//                 {/* Markers for each location */}
//                 {locations.map((location, index) => (
//                   <Marker
//                     key={index}
//                     position={[
//                       parseFloat(location.lat), // Convert lat from string to float
//                       parseFloat(location.long), // Convert long from string to float
//                     ]}
//                   >
//                     <Popup>
//                       <span>{location.name}</span> {/* Display location name */}
//                     </Popup>
//                   </Marker>
//                 ))}
//               </MapContainer>
//             ) : (
//               <p>No Ragams available.</p>
//             )}
//           </div>
//         </div>
//       </Fragment>
//     </>
//   );
// };

// export default ExploreMap;

// import { Fragment, useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { getLocation } from "../utils/api";
// import { Skeleton } from "antd";
// import * as turf from "@turf/turf";  // Import turf.js for spatial calculations

// const ExploreMap = () => {
//   const [locations, setLocations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [zoomLevel, setZoomLevel] = useState(10);
//   const [circleRadius, setCircleRadius] = useState(5000);
  
//   const center = [-8.4095, 115.1889]; // Center of Bali

//   useEffect(() => {
//     getDataLocation();
//   }, []);

//   const getDataLocation = () => {
//     setLoading(true);
//     getLocation("/api/v1/location/read")
//       .then((resp) => {
//         console.log("API Response:", resp);  // Log the API response
  
//         if (resp && resp.datas) {
//           // If response is in GeoJSON format, extract features array
//           if (resp.datas.features && Array.isArray(resp.datas.features)) {
//             setLocations(resp.datas.features);
//           } else {
//             console.error("Invalid GeoJSON structure, expected 'features' array.");
//           }
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   };
  

//   const calculateRadius = (zoom) => {
//     const baseRadius = 1000;  // Base radius in meters
//     const referenceZoomLevel = 10;
//     const radius = baseRadius * Math.pow(1.2, zoom - referenceZoomLevel);
//     const minRadius = 500;
//     const maxRadius = 2000;
//     return Math.max(minRadius, Math.min(radius, maxRadius));
//   };

//   const handleZoom = (e) => {
//     const newZoom = e.target.getZoom();
//     setZoomLevel(newZoom);
//     setCircleRadius(calculateRadius(newZoom));
//   };

//   // Function to group locations based on proximity
//   const groupLocationsByProximity = (locations, maxDistance) => {
//     const groups = [];
  
//     // Log locations to check their format
//     console.log("Locations Data:", locations);
  
//     // Create a list of all location points using GeoJSON format
//     const points = locations.map((loc) => {
//       if (loc.geometry && loc.geometry.type === "Point") {
//         return turf.point(loc.geometry.coordinates);  // GeoJSON Point format [longitude, latitude]
//       } else {
//         console.error("Invalid GeoJSON type:", loc.geometry.type);  // Log invalid types
//         return null;
//       }
//     }).filter((point) => point !== null);  // Filter out invalid points
    
//     if (points.length === 0) {
//       console.error("No valid points to cluster.");
//       return [];
//     }
  
//     // Use turf clustering to group points within the max distance
//     turf.clustersDbscan(points, { distance: maxDistance, minPoints: 1 }).features.forEach((cluster, index) => {
//       const clusterLocations = cluster.properties.cluster_ids.map((id) => locations[id]);
//       const centroid = turf.centroid(cluster);
//       const group = {
//         center: centroid.geometry.coordinates,
//         locations: clusterLocations,
//       };
//       groups.push(group);
//     });
  
//     return groups;
//   };
  

//   // Group locations based on proximity (5km radius for example)
//   const groupedLocations = groupLocationsByProximity(locations, 5000);

//   return (
//     <Fragment>
//       <div className="container">
//         <div style={{ width: "100%", height: "90vh" }}>
//           {loading ? (
//             <Skeleton active />
//           ) : locations.length > 0 ? (
//             <MapContainer
//               center={center}
//               zoom={zoomLevel}
//               style={{ height: "100%", width: "100%" }}
//               onzoom={handleZoom}
//             >
//               <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
//               />

//               {/* Draw circles around grouped locations */}
//               {groupedLocations.map((group, index) => (
//                 <Circle
//                   key={index}
//                   center={group.center}
//                   radius={circleRadius}
//                   color="blue"
//                   fillColor="blue"
//                   fillOpacity={0.3}
//                 >
//                   <Popup>
//                     <span>
//                       {group.locations.map((loc) => (
//                         <div key={loc.properties.id}>{loc.properties.location}</div>
//                       ))}
//                     </span>
//                   </Popup>
//                 </Circle>
//               ))}

//               {/* Markers for the individual locations */}
//               {locations.map((location, index) => (
//                 <Marker
//                   key={index}
//                   position={location.geometry.coordinates.reverse()}  // [longitude, latitude] order
//                 >
//                   <Popup>{location.properties.location}</Popup>
//                 </Marker>
//               ))}
//             </MapContainer>
//           ) : (
//             <p>No locations available.</p>
//           )}
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default ExploreMap;
