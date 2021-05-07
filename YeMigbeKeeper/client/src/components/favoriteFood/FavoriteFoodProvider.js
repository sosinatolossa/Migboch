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
                body: JSON.stringify(habeshaFood), //this stringifies our habesha food object meaning it changes our object into string object
            }).then(res => res.json()) //then send the stringified object(res), and we will use this in our PostForm after we add new object
        });
    };

    const deleteFavoriteHabeshaFood = (favHabeshaFoodId) => {
        getToken().then((token) =>
            fetch(`/api/FavoriteFood/${favHabeshaFoodId}`, {
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
