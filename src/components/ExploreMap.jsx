import { Fragment, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getData } from "../utils/api";
import {
  Avatar,
  Card,
  Col,
  Form, 
  Row,
  Skeleton,
  Typography,
} from "antd";
import ModalRagam from "./ModalRagam";

const REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const { Text, Paragraph, Title } = Typography;
const { Meta } = Card;

const ExploreMap = () => {
  const [areas, setAreas] = useState([]); // Store areas with clusters
  const [loading, setLoading] = useState(true); // Loading state for data
  const [center, setCenter] = useState([-8.4095, 115.1889]); // Initial center of Bali
  const [zoomLevel, setZoomLevel] = useState(10); // Initial zoom level
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); 

  useEffect(() => {
    getDataLocation();
    // Whenever center or zoomLevel changes, log them for debugging
    console.log("Map center:", center);
    console.log("Zoom level:", zoomLevel);
  }, [center, zoomLevel]);

  // Fetch the data for locations and areas
  const getDataLocation = () => {
    setLoading(true);
    getData("/api/v1/location/read")
      .then((resp) => {
        if (resp && resp.datas) {
          setAreas(resp.datas); // Set areas with clusters
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  // Handle zoom event to update the zoom level
  const handleZoomChange = (e) => {
    const newZoom = e.target.getZoom();
    setZoomLevel(newZoom); // Update zoom level in state
  };

  // Handle card click to zoom into a specific area on the map
  const handleCardClick = (area) => {
    setCenter([area.lat, area.long]); // Update the map's center to the clicked area's coordinates
    setZoomLevel(12); // Set a higher zoom level for better visibility of the clicked area
  };

  //const handle untuk modal
  const handleModal = (item) => {
    
                            {/* Pass the modal visibility and selected event as props to ModalRagam */}
                            // <ModalRagam
                            //   isModalOpen={isModalOpen}
                            //   setIsModalOpen={setIsModalOpen}
                            //   selectedEvent={selectedEvent}
                            // />
    setSelectedEvent(item);
    setIsModalOpen(true);
  };

  //Checkbox
  const [value, setValue] = useState();
  const Report = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  //Handle Report Submit
  const [form] = Form.useForm();

  return (
    <Row className="mt-6">
      <Col className="w-full">
        <div className="flex flex-col items-center justify-center mb-8">
          <Text className="text-3xl font-bold">
            Discover the Best Events in{" "}
            <span className="text-[#7658B2]">Your Chosen Location!</span>
          </Text>
          <br />
          <Text className="text-sm font-normal">
            Looking to attend exciting events in your city?{" "}
            <span className="text-[#7658B2]">
              Simply select your location on the map and explore a list of
              events happening near you!
            </span>
          </Text>
        </div>
      </Col>

      <div className="flex w-full gap-8">
        {/* Left panel with cards */}
        <div className="flex-grow flex flex-col gap-4">
          {areas.map((area, areaIndex) => (
            <Card
              className="bg-[#A594F9] text-white"
              hoverable
              onClick={() => handleCardClick(area)} // Handle card click to zoom in on the area
              key={areaIndex}
            >
              <h2>{area.name}</h2> {/* Area name */}
              <p>{area.locations.length} locations</p>{" "}
              {/* Number of locations in the area */}
            </Card>
          ))}
        </div>

        {/* Map panel */}
        <div className="w-2/3">
          <Fragment>
            {loading ? (
              <Skeleton active />
            ) : areas.length > 0 ? (
              <MapContainer
                center={center} // Update map's center based on the selected area
                zoom={zoomLevel} // Update map's zoom level
                style={{ height: "100%", width: "100%" }}
                onzoomend={handleZoomChange} // Handle zoom change to update zoom level state
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
                      key={`${areaIndex}-${locIndex}`}
                      position={[
                        parseFloat(location.lat), // Convert lat from string to float
                        parseFloat(location.long), // Convert long from string to float
                      ]}
                    >
                      <Popup   title="Title">
                        <Card
                          onClick={() => handleModal(location)}
                          hoverable={true}
                          bordered={false} // This removes the border
                          style={{
                            width: 300,
                            boxShadow: "none",
                          }}
                          className="group hover:scale-105 hover:shadow-violet-300 hover:shadow-l"
                        >
                          <Col style={{ gap: "10px" }}>
                            <img
                              alt="example"
                              src={`${REACT_APP_API_URL}/${location.image_path}`}
                              style={{
                                width: "100%", // Fill the width of the Card
                                height: "75px", // Resize image height (you can adjust this value as needed)
                                objectFit: "cover", // Ensures the image covers the space while maintaining aspect ratio
                              }}
                            />
                          </Col>
                          <Meta
                            avatar={
                              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                            }
                            title={location.title}
                            description={location.description}
                          />
                        </Card>
                      </Popup>
                    </Marker>
                  ))
                )}
              </MapContainer>
            ) : (
              <p>No areas available.</p>
            )}
          </Fragment>
        </div>
      </div>
    </Row>
  );
};

export default ExploreMap;
