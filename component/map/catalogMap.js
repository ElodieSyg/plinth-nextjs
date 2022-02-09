import { MapContainer } from "react-leaflet";
import { useEffect, useContext } from "react";
// COMPONENTS IMPORTATION
import MyMap from "./map";
// CONTEXT IMPORTATION
import { LocationContext } from "../../context/PositionContext";

const CatalogMap = () => {
    const { position, setPosition } = useContext(LocationContext);

    useEffect(() => {
        if (position.length === 0) {
            setPosition([48.866667, 2.333333])
        };
    }, [setPosition]);

    return (
        <div>
            {
                position.length > 0 &&
                <MapContainer className="mapContainer" center={position} zoom={14} scrollWheelZoom={true}>
                    <MyMap className="mapContainer" position={position} center={position} zoom={14} />
                </MapContainer>
            }
        </div>
    );
};

export default CatalogMap;