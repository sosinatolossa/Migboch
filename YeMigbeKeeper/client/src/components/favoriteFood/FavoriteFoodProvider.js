import React, { useState, createContext, useContext } from "react";
import { UserContext } from "../user/UserProvider";

export const FavoriteFoodContext = createContext();

export const FavoriteFoodProvider = (props) => {
    const { getToken } = useContext(UserContext);
    const [favoriteFoods, setFavoriteFoods] = useState([]);

    const getAllFavoriteFoods = () => {
        return getToken()
            .then(token => fetch("/api/FavoriteFood", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setFavoriteFoods));
    }

    return (
        <FavoriteFoodContext.Provider value={{ favoriteFoods, getAllFavoriteFoods }}>
            {props.children}
        </FavoriteFoodContext.Provider>
    )
}
