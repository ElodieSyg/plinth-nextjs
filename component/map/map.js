import { TileLayer, Popup, useMap, Circle } from "react-leaflet";

function MyMap(props) {
    const map = useMap();
    map.setView(props.center, props.zoom);

    return (
        <>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Circle center={props.position} radius={500} >
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Circle>
        </>
    );
};

export default MyMap;