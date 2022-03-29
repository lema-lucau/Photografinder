import Header from "../components/header";
import Sidebar from "../components/sidebar";
import UserProfile from "../components/userProfile";
import { useState, useEffect } from "react";
import { getUserByUsername } from "../services/users";
import { useNavigate, useParams } from "react-router-dom";
import { LOGGED_IN_USER } from "../constants/user";
import { LOGIN } from "../constants/routes";
import { Skeleton } from "@mantine/core";

export default function Profile() {
    const {username} = useParams();
    const [user, setUser] = useState(null);
    const [userNotFound, setUserNotFound] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = `${username}'s Profile`;

        const fbUser = JSON.parse(localStorage.getItem(LOGGED_IN_USER));

        // Redirect user if they are not logged in
        if (fbUser === null) {
            navigate(LOGIN);
        }

        const getUser = async () => {
            const returnedUser = await getUserByUsername(username);
            if (returnedUser !== null) {
                setUser(returnedUser);
            } else {
                setUserNotFound(true);
            }
        };

        getUser();
    }, [username]);

    return(
        <>
            <Header />
            <div className="flex flex-row bg-white">
                <Sidebar />
                <div className="w-full pt-12 px-12">
                    { userNotFound === true ? 
                        <div className="flex flex-col justify-items-center h-screen">
                            <p className="text-center text-4xl font-semibold mt-16">User not found</p>
                            <img className="w-96 h-96 mt-16 mx-auto" src="https://img.icons8.com/external-flaticons-flat-flat-icons/344/external-not-found-no-code-flaticons-flat-flat-icons.png"/>
                        </div>
                    : !user ?
                        <>
                            <Skeleton className="rounded-3xl" height={320}/>
                            <Skeleton className="rounded-3xl mt-8" height={640}/>
                        </>
                    : user?.username ? <UserProfile user={user}/> 
                    : null }
                </div>
            </div>
        </>
    );
}