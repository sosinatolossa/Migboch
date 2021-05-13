import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "./user/UserProvider";
import Login from "./Login";
import Register from "./Register";
import UserList from "././user/UserList";
import HabeshaFoodList from "././habeshaFood/HabeshaFoodList";
import HabeshaFoodDetails from "././habeshaFood/HabeshaFoodDetails";
import MyHabeshaFoods from "././habeshaFood/MyHabeshaFoods";
import HabeshaFoodCreateForm from "./habeshaFood/HabeshaFoodCreateForm";
import HabeshaFoodEditForm from "./habeshaFood/HabeshaFoodEditForm";
import TypeList from "././type/TypeList";
import MyFavoriteFoodList from "././favoriteFood/FavoriteFoodList";
import RecipeList from "././recipe/RecipeList";
import Welcome from "./Welcome";


export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <main>
            <Switch>

                <Route path="/" exact>
                    {isLoggedIn ? <Welcome /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/user" exact>
                    {isLoggedIn ? <UserList /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/HabeshaFood">
                    {isLoggedIn ? <HabeshaFoodList /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/HabeshaFood/:id(\d+)">
                    {isLoggedIn ? <HabeshaFoodDetails /> : <Redirect to="/login" />}
                </Route>

                <Route path="/myHabeshaFoods" exact>
                    {isLoggedIn ? <MyHabeshaFoods /> : <Redirect to="/login" />}
                </Route>

                <Route path="/types" exact>
                    {isLoggedIn ? <TypeList /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/HabeshaFood/create">
                    <HabeshaFoodCreateForm />
                </Route>

                <Route path="/HabeshaFood/edit/:habeshaFoodId(\d+)">
                    <HabeshaFoodEditForm />
                </Route>

                <Route path="/FavoriteFood">
                    {isLoggedIn ? <MyFavoriteFoodList /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/Recipe">
                    {isLoggedIn ? <RecipeList /> : <Redirect to="/login" />}
                </Route>

            </Switch>
        </main>
    );
}