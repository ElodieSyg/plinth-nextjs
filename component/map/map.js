import { TileLayer, Popup, useMap, Circle } from "react-leaflet";

const Map = props => {
    const map = useMap()
    map.setView(props.center, props.zoom);


    return (
        <div>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Circle center={props.position} radius={500} >
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Circle>
        </div>
    );
};

export default Map;