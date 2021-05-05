import React, { useState, createContext, useContext } from "react";
import { UserContext } from "../user/UserProvider";

export const TypeContext = createContext();

export const TypeProvider = (props) => {
    const { getToken } = useContext(UserContext);
    const [types, setTypes] = useState([]);

    const getAllTypes = () => {
        return getToken()
            .then(token => fetch("/api/type", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setTypes));
    }

    return (
        <TypeContext.Provider value={{ types, getAllTypes }}>
            {props.children}
        </TypeContext.Provider>
    )
}
