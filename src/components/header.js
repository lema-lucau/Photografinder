import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { DASHBOARD, LOGIN } from "../constants/routes";
import { auth } from "../firebase-config";
import Logo from "./logo";
import { getUserByUserId } from "../services/users";
import { LOGGED_IN_USER } from "../constants/user";
import { Skeleton } from "@mantine/core";

export default function Header() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        const firebaseUser = JSON.parse(localStorage.getItem(LOGGED_IN_USER));

        const getUser = async () => {
            const user = await getUserByUserId(firebaseUser.uid);
            setUser(user);
        }
        getUser();
    }, [])

    async function logOut() {
        await signOut(auth);

        navigate(LOGIN);
    }

    const searchUser = (event) => {
        event.preventDefault();
        navigate(`/p/${username}`);
        window.location.reload();
    }

    return(
        <div className=" bg-white w-full">
            <div className="grid grid-rows-1 grid-flow-col items-center border border-b-black py-2 px-12">
                <Logo />
                <div className="container flex flex-row bg-gray-200 border border-gray-400 rounded-full my-2 p-2">
                    <img className="ml-1 w-6 h-6" src="https://img.icons8.com/color/344/search--v1.png" alt="magnifying glass"/>
                    <form onSubmit={searchUser} className="w-full">
                        <input 
                            id="search" 
                            placeholder="Search" 
                            type="text"
                            className="bg-gray-200 outline-none text-m w-11/12 px-2" 
                            onChange={(event) => {setUsername(event.target.value)}}
                        />
                        <input type="submit" hidden />
                    </form>
                </div>
                <div className="flex justify-end items-center">
                    <Link to={DASHBOARD}>
                        <img className="w-14 h-14 mx-2 cursor-pointer" src="https://img.icons8.com/color/344/home--v1.png" alt="home"/>
                    </Link>

                    <img className="w-14 h-14 mx-8 cursor-pointer" src="https://img.icons8.com/external-kmg-design-flat-kmg-design/344/external-log-out-user-interface-kmg-design-flat-kmg-design.png" alt="log out" onClick={logOut} />

                    {user?.username ? 
                        <Link to={`/p/${user.username}`}>
                            <img className="rounded-full w-24 h-24 cursor-pointer" 
                            src={user.profilePicUrl === "" ? "../images/default_user_icon.png" : user.profilePicUrl} 
                            alt={`${username}'s profile picture`}/>
                        </Link>
                        :
                        <Skeleton height={96} circle />
                    }
                </div>
            </div>
        </div>
    );
}