import Header from "../components/header";
import Sidebar from "../components/sidebar";
import UserProfile from "../components/userProfile";
import { useState, useEffect } from "react";
import { getUserByUsername } from "../services/users";
import { useParams } from "react-router-dom";

export default function Profile() {
    const {username} = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
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
                    <p className="text-center text-2xl">User not found</p>}
                </div>
            </div>
        </>
    );
}