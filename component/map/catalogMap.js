import { MapContainer } from "react-leaflet";
import { useEffect, useContext, useState } from "react";
// COMPONENTS IMPORTATION
import MyMap from "./map";
import "../../styles/Map.module.css";
// CONTEXT IMPORTATION
import { LocationContext } from "../../context/PositionContext";

const CatalogMap = () => {
    //const { position, setPosition } = useContext(LocationContext);
    const [position, setPosition] = useState([47.828569, 1.9238044], 12);

    useEffect(() => {
        if (position.length === 0) {
            setPosition([48.866667, 2.333333])
        };
    }, [setPosition]);

    return (
        <div>
            <MapContainer center={position} zoom={14}>
                <MyMap className="mapContainer" position={position} center={position} zoom={2} />
            </MapContainer>
        </div>
    );
};

export default CatalogMap; 