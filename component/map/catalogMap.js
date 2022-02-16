import { useEffect, useContext } from "react";
import { MapContainer } from "react-leaflet";
// COMPONENTS IMPORTATIONS
import MyMap from "./map";
// CONTEXTS IMPORTATIONS
import { LocationContext } from "../../context/LocationContext"
// CSS IMPORTATION
import "../../styles/Map.module.css";


function CatalogMap() {
    const { position, setPosition } = useContext(LocationContext);

    useEffect(() => {
        if (position.length === 0) {
            setPosition([48.866667, 2.333333])
        };
    }, [setPosition]);

    return (
        <div>

            {position.length > 0 &&
                <MapContainer className="mapContainer" center={position} zoom={14} scrollWheelZoom={true}>
                    <MyMap position={position} center={position} zoom={14} />
                </MapContainer>}
        </div>
    );
};

export default CatalogMap;