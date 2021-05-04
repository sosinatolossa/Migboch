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
                .then((res) => res.json()) //changing it to json bc that's what's readable in the browser
                .then(setHabeshaFoods)
        );
    }

    //this function is for deatils of a habesha food
    const getHabehsaFoodById = (habeshaFoodId) => {
        return getToken().then((token) =>
            fetch(`/api/HabeshaFood/${habeshaFoodId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );
    }


    return (
        <HabeshaFoodContext.Provider value={{ habeshaFoods, setHabeshaFoods, getAllHabeshaFoods, getHabehsaFoodById }}>
            {props.children}
        </HabeshaFoodContext.Provider>
    )

}