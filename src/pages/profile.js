import Header from "../components/header";
import Sidebar from "../components/sidebar";
import UserProfile from "../components/userProfile";
import { useState, useEffect } from "react";
import { getUserByUsername } from "../services/users";
import { useNavigate, useParams } from "react-router-dom";
import { LOGGED_IN_USER } from "../constants/user";
import { LOGIN } from "../constants/routes";

export default function Profile() {
    const {username} = useParams();
    const [user, setUser] = useState(null);

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
                    {user?.username ? <UserProfile user={user}/> 
                    : 
                    <p className="text-center h-screen text-2xl">User not found</p>}
                </div>
            </div>
        </>
    );
}