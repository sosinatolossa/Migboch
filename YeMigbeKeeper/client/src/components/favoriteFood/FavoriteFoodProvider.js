import React, { useState, createContext, useContext } from "react";
import { UserContext } from "../user/UserProvider";

export const FavoriteFoodContext = createContext();

export const FavoriteFoodProvider = (props) => {
    const { getToken } = useContext(UserContext);
    const [myFavoriteFoods, setMyFavoriteFoods] = useState([]);
    const [myFavFoodDeleted, setMyFavFoodDeleted] = useState(false);

    const getFavoriteFoodsByUser = () => {
        return getToken().then((token) =>
            fetch("/api/FavoriteFood/myFavoriteFoods", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then(setMyFavoriteFoods)
        );
    }

    //adding a new favorite habesha food
    const addFavoriteHabeshaFood = (habeshaFood) => {
        return getToken().then((token) => {
            return fetch(`/api/FavoriteFood`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(habeshaFood),
            }).then(res => res.json())
        });
    };

    const deleteFavoriteHabeshaFood = (habeshaFoodId) => {
        getToken().then((token) =>
            fetch(`/api/FavoriteFood/${habeshaFoodId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
        );
    };

    return (
        <FavoriteFoodContext.Provider value={{ myFavoriteFoods, getFavoriteFoodsByUser, addFavoriteHabeshaFood, deleteFavoriteHabeshaFood, myFavFoodDeleted, setMyFavFoodDeleted }}>
            {props.children}
        </FavoriteFoodContext.Provider>
    )
}
