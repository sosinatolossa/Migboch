import React, { useState, createContext, useContext } from "react";
import { UserContext } from "../user/UserProvider";

export const RecipeContext = createContext();

export const RecipeProvider = (props) => {
    const [recipes, setRecipes] = useState([]);
    const { getToken } = useContext(UserContext);

    const getAllRecipes = () => {
        return getToken()
            .then(token => fetch("/api/Recipe", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setRecipes));
    }
    console.log(recipes, "the recipes in recipe provider")

    return (
        <RecipeContext.Provider value={{ recipes, getAllRecipes }}>
            {props.children}
        </RecipeContext.Provider>
    )
}
