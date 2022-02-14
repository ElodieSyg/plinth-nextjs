import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useContext, useState } from "react";
// COMPONENTS IMPORTATION
import MyMap from "./map";
import "../../styles/Map.module.css";
// CONTEXT IMPORTATION
import { LocationContext } from "../../context/PositionContext";

const position = [51.505, -0.09]

const CatalogMap = () => {
    return (
        <MapContainer center={position} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default CatalogMap;

/* const CatalogMap = () => {
    //const { position, setPosition } = useContext(LocationContext);
    const [position, setPosition] = useState([51.505, -0.09]);

    useEffect(() => {
        if (position.length === 0) {
            setPosition([48.866667, 2.333333])
        };
    }, [setPosition]);

    return (
        <div>
            {
                position.length > 0 &&
                <MapContainer className="mapContainer" center={position} zoom={14}>
                    <MyMap position={position} center={position} zoom={14} />
                </MapContainer>
            }
        </div>
    );
};

export default CatalogMap; */