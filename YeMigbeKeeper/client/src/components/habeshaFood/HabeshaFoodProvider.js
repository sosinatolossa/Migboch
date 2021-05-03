import React, { useState, createContext, useContext } from "react";
import "firebase/auth";
import { UserContext } from "../user/UserProvider";

export const HabeshaFoodContext = createContext();

export const HabeshaFoodProvider = (props) => {
    const [habeshaFoods, setHabeshaFoods] = useState([]);
    const { getToken } = useContext(UserContext);

    //this function fetches habeshaFoods api, gets the data and changes it to json and sets our data with it
    const getAllHabeshaFoods = () => {
        return getToken().then((token) =>
            fetch("/api/HabeshaFood", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then(setHabeshaFoods)
        );
    }

    return (
        <HabeshaFoodContext.Provider value={{ habeshaFoods, getAllHabeshaFoods }}>
            {props.children}
        </HabeshaFoodContext.Provider>
    )

}