import React, { useState, createContext, useContext } from "react";
import { UserContext } from "../user/UserProvider";

export const FavoriteFoodContext = createContext();

export const FavoriteFoodProvider = (props) => {
    const { getToken } = useContext(UserContext);
    const [myFavoriteFoods, setMyFavoriteFoods] = useState([]);

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

    return (
        <FavoriteFoodContext.Provider value={{ myFavoriteFoods, getFavoriteFoodsByUser }}>
            {props.children}
        </FavoriteFoodContext.Provider>
    )
}
