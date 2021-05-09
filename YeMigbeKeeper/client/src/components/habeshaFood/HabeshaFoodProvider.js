import React, { useState, createContext, useContext } from "react";
import "firebase/auth";
import { UserContext } from "../user/UserProvider";
import { useHistory } from 'react-router-dom';


export const HabeshaFoodContext = createContext();

export const HabeshaFoodProvider = (props) => {
    const [habeshaFoods, setHabeshaFoods] = useState([]);
    const { getToken } = useContext(UserContext);
    const history = useHistory();


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

    //adding a new habesha food
    const addHabeshaFood = (habeshaFood) => {
        return getToken().then((token) => {
            return fetch(`/api/HabeshaFood`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(habeshaFood), //this stringifies our habesha food object meaning it changes our object into string object
            }).then(res => res.json()) //then send the stringified object(res), and we will use this in our PostForm after we add new object
        });
    };

    //this function is for editing a habesha food
    const updateHabeshaFood = (habeshaFood) => {
        return getToken().then((token) =>
            fetch(`/api/HabeshaFood/${habeshaFood.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(habeshaFood),
            }).then(history.push(`/HabeshaFood/${habeshaFood.id}`))
        );
    };

    const deleteHabeshaFood = (habeshaFoodId) =>
        getToken().then((token) =>
            fetch(`/api/HabeshaFood/${habeshaFoodId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }).then(history.push("/HabeshaFood"))
        );

    return (
        <HabeshaFoodContext.Provider value={{ habeshaFoods, setHabeshaFoods, getAllHabeshaFoods, getHabehsaFoodById, addHabeshaFood, updateHabeshaFood, deleteHabeshaFood }}>
            {props.children}
        </HabeshaFoodContext.Provider>
    )

}