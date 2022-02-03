import { useState, createContext, useEffect, useMemo } from "react";

export const UserContext = createContext();

const UserCtx = (props) => {
    const [isLogged, setLogged] = useState(false);

    const value = useMemo(() => {

    })
/*     const value = (useMemo) {
        isLogged, setLogged,
    };
 */
    useEffect(() => {
        console.log("is logged in user context", isLogged);
    }, []);

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserCtx;