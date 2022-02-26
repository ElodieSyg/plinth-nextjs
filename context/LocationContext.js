import { useState, createContext } from "react";

export const LocationContext = createContext();

const LocationProvider = (props) => {
    const [position, setPosition] = useState([48.856614, 2.3522219]);
    const value = {
        position,
        setPosition,
    };

    return (
        <LocationContext.Provider value={value}>
            {props.children}
        </LocationContext.Provider>
    );
};

export default LocationProvider;