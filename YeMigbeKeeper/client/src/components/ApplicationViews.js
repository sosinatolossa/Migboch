import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "./user/UserProvider";
import Login from "./Login";
import Register from "./Register";
import UserList from "././user/UserList";
import HabeshaFoodList from "././habeshaFood/HabeshaFoodList";


export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <main>
            <Switch>

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

            </Switch>
        </main>
    );
}