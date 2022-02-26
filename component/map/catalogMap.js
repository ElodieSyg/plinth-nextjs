import { useEffect, useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LocationContext } from "../../context/LocationContext";
import Map from "./map";

const CatalogMap = () => {
  const { position, setPosition } = useContext(LocationContext);

  useEffect(() => {
    if (position.length === 0) {
      setPosition([48.856614, 2.3522219]);
    };
  }, [setPosition]);

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: 400, width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Map position={position} center={position} zoom={13} />
    </MapContainer>
  )
}

export default CatalogMap;