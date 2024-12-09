import { Fragment, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const markers = [
  {
    id: 1,
    name: "Poetry",
    position: { lat: -8.41284, lgn: 115.223808 },
  },
  {
    id: 2,
    name: "Bucket",
    position: { lat: -8.643281, lgn: 115.258344 },
  },
  {
    id: 3,
    name: "Bake",
    position: { lat: -8.68, lgn: 115.24 },
  },
];

const ExploreMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker == activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <Fragment>
      <div className="container">
        <p className="text-center mt-[100px]">aaaaf</p>
        <div style={{ width: "100%", height: "90vh" }}>
          {isLoaded ? (
            <GoogleMap
              center={{
                lat: -8.65,
                lng: 115.2167,
              }}
              zoom={13}
              onClick={() => setActiveMarker(null)}
              mapContainerStyle={{
                width: "100%",
                height: "90vh",
              }}
            >
              {/* Markers here */}
              {markers.map(({ id, name, position }) => (
                <MarkerF
                  key={id}
                  position={position}
                  onClick={() => handleActiveMarker(id)}
                >
                  {activeMarker === id ? (
                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                      <div>
                        <p>{name}</p>
                      </div>
                    </InfoWindowF>
                  ) : null}
                </MarkerF>
              ))}
            </GoogleMap>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export default ExploreMap;
