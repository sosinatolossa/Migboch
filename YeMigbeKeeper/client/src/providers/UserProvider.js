import React, { useState, useEffect, createContext } from "react";
import { useHistory } from "react-router-dom";
import { Spinner } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";

export const UserContext = createContext();

export function UserProvider(props) {
    const history = useHistory();
    const apiUrl = "/api/User";
    const [users, setUsers] = useState([]);

    const User = sessionStorage.getItem("User");
    const [isLoggedIn, setIsLoggedIn] = useState(User != null);

    const [isFirebaseReady, setIsFirebaseReady] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((u) => {
            setIsFirebaseReady(true);
        });
    }, []);

    const login = (email, pw) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, pw)
            .then((signInResponse) => getUser(signInResponse.user.uid))
            .then((User) => {
                sessionStorage.setItem("User", JSON.stringify(User));
                setIsLoggedIn(true);
            });
    };

    const logout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                history.push('/login');
                sessionStorage.clear();
                setIsLoggedIn(false);
            });
    };

    const register = (User, password) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(User.email, password)
            .then((createResponse) =>
                saveUser({ ...User, firebaseUserId: createResponse.user.uid })
            )
            .then((savedUser) => {
                sessionStorage.setItem("User", JSON.stringify(savedUser));
                setIsLoggedIn(true);
            });
    };

    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getUser = (firebaseUserId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${firebaseUserId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((resp) => resp.json())
        );
    };

    const saveUser = (User) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(User),
            }).then((resp) => resp.json())
        );
    };

    const getAllUsers = () => {
        return getToken()
            .then(token => fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setUsers));
    };

    const getUserById = (id) => {
        return getToken()
            .then(token => fetch(`${apiUrl}/user${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json()))
    };

    return (
        <UserContext.Provider
            value={{
                isLoggedIn,
                users,
                login,
                logout,
                register,
                getToken,
                getAllUsers,
                getUserById
            }}
        >
            {isFirebaseReady ? (
                props.children
            ) : (
                <Spinner className="app-spinner dark" />
            )}
        </UserContext.Provider>
    );
}