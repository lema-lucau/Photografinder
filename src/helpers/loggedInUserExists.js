import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { LOGGED_IN_USER } from "../constants/user";
import { auth } from "../firebase-config";

export default function LoggedInUserExists() {
    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem(LOGGED_IN_USER)));

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // There is a logged in user so we set the the local storage 
                localStorage.setItem(LOGGED_IN_USER, JSON.stringify(user));
                setLoggedInUser(user);
            } else {
                // There is no logged in user, therefore we clear the local storage
                localStorage.removeItem(LOGGED_IN_USER);
                setLoggedInUser(null);
            }
        });
    }, [loggedInUser]);

    return loggedInUser;
}