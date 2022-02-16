import { useState, createContext } from "react";

export const LocationContext = createContext();

const LocationProvider = (props) => {
    const [position, setPosition] = useState([]);
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