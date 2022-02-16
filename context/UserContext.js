import { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
    const [isLogged, setLogged] = useState(false);
    const value = {
        isLogged, 
        setLogged,
    };

    useEffect(() => {
        console.log("is logged in user context", isLogged);
    }, []);

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;