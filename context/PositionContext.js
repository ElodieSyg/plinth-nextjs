import { useState, createContext } from "react";

export const LocationContext = createContext();

const PositionContext = (props) => {
    const [position, setPosition] = useState([]);
    const value = {
        position,
        setPosition,
    };

    return (
        <LocationContext.Consumer value={value}>
            {props.children}
        </LocationContext.Consumer>
    );
};

export default PositionContext;