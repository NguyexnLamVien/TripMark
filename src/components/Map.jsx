import { useNavigate } from "react-router";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCity } from "../context/CitiesContext";
import "leaflet/dist/leaflet.css";
import useUrlPosition from "./../hook/useUrlPosition";

function useGeolocation() {
  const [position, setPosition] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const   [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { isLoading, error, position, getPosition };
}

export default function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const { cities } = useCity();
  const { mapLng: lng, mapLat: lat } = useUrlPosition();
  const { isLoading, position, getPosition } = useGeolocation();

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(
    function () {
      if (position.length == 2) setMapPosition(position);
    },
    [position]
  );

  if (!cities) return null;

  return (
    <div className="w-[60%] h-[100%] bg-gray-500 relative" id="map">
      <button
        className="btn absolute bottom-5 left-1/2 -translate-x-1/2 mx-auto z-20 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        onClick={getPosition}
      >
        {isLoading ? "Finding your location..." : "USE YOUR LOCATION"}
      </button>

      <MapContainer
        center={mapPosition}
        zoom={10}
        scrollWheelZoom={false}
        className="w-[100%] h-[100%] z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>
                {city.emoji} {city.cityName}
              </span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      navigate(`form/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null;
}
