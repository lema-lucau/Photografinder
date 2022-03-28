import { Skeleton } from "@mantine/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Photoshoot from "../components/photoshoot";
import Sidebar from "../components/sidebar";
import Timeline from "../components/timeline";
import { CONFIRMED } from "../constants/photoshoot";
import { LOGIN } from "../constants/routes";
import { LOGGED_IN_USER } from "../constants/user";
import { getUserPhotoshootsByStatus } from "../services/photoshoots";
import { getUserByUserId } from "../services/users";

export default function Dashboard() {
    const [photoshoots , setPhotoshoots] = useState(null);
    const [user, setUser] = useState(null);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        document.title = "Dashboard";

        const firebaseUser = JSON.parse(localStorage.getItem(LOGGED_IN_USER));

        // Redirect user if they are not logged in
        if (firebaseUser === null) {
            navigate(LOGIN);
        }
        
        let user;
        const getUser = async () => {
            user = await getUserByUserId(firebaseUser.uid);
            setUser(user);
        }

        const getPhotoshoots = async () => {
            const photoshoots = await getUserPhotoshootsByStatus(firebaseUser.uid, CONFIRMED);

            // Add the photographers username to the photoshoot
            photoshoots.map(async (photoshoot) => {      

                // If logged in user is a photographer display clients name
                if (user.type === "Photographer") {
                    await getUserByUserId(photoshoot.clientId)
                    .then(data => photoshoot.username = data.username);
                } else if (user.type === "Client") {
                    // If logged in user is a client display photographers name
                    await getUserByUserId(photoshoot.photographerId)
                    .then(data => photoshoot.username = data.username);
                }
            });

            setTimeout(() => {setPhotoshoots(photoshoots)}, 800)
        }

        getUser();
        setTimeout(() => {
            getPhotoshoots();
        }, 500);
    }, []);

    return(
        <>
            <Header />
            <div className="flex flex-row h-screen">
                <Sidebar />
                <div className="grid grid-cols-10 gap-0 w-full">
                    <div className="flex col-span-6 justify-center ml-8">
                        {user?.uid ? <Timeline user={user}/> : null}
                    </div>
                    <div className="flex col-span-4 w-full overflow-y-auto justify-center py-8 mx-auto px-8 bg-sky-100">

                        <div className="flex flex-col items-center w-full">
                            <h1 className="text-2xl font-semibold italic mb-4">Scheduled Photoshoots</h1>
                            <span className="border-b border-black w-full mb-6"/>

                            <div className="w-full h-full overflow-y-auto">
                                { !photoshoots ?
                                    <>
                                        <Skeleton className="mt-2 mb-2 rounded-3xl" height={96} /> 
                                        <Skeleton className="mb-2 rounded-3xl" height={96} /> 
                                        <Skeleton className="mb-2 rounded-3xl" height={96} /> 
                                        <Skeleton className="mb-2 rounded-3xl" height={96} /> 
                                    </>
                                : photoshoots.length === 0 ? 

                                <p className="text-2xl text-center">You have no confirmed photoshoots to display</p>

                                : photoshoots !== null ?
                                    photoshoots.map((photoshoot) => {
                                        return (
                                            <Photoshoot 
                                                key={photoshoot.id}
                                                size="small"
                                                {...photoshoot}
                                            />
                                        );
                                    })
                                : null}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}