import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../../firebase-config";

export default function LoggedInUserExists() {
    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")));

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // There is a logged in user so we set the the local storage 
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                setLoggedInUser(user);
            } else {
                // There is no logged in user, therefore we clear the local storage
                localStorage.removeItem('loggedInUser');
                setLoggedInUser(null);
            }
        });
    }, [loggedInUser]);

    return loggedInUser;
}