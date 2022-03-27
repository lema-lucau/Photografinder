import { useState, useEffect } from "react";
import Header from "../components/header";
import Photoshoot from "../components/photoshoot";
import Sidebar from "../components/sidebar";
import Timeline from "../components/timeline";
import { CONFIRMED } from "../constants/photoshoot";
import { LOGGED_IN_USER } from "../constants/user";
import { getUserPhotoshootsByStatus } from "../services/photoshoots";
import { getUserByUserId } from "../services/users";

export default function Dashboard() {
    const [photoshoots , setPhotoshoots] = useState(null);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const firebaseUser = JSON.parse(localStorage.getItem(LOGGED_IN_USER));
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

            setTimeout(() => {setPhotoshoots(photoshoots)}, 500)
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
                <div className="grid grid-cols-10 gap-2 w-full">
                    <div className="flex col-span-6 justify-center border-r border-black ml-8">
                        {user?.uid ? <Timeline user={user}/> : null}
                    </div>
                    <div className="flex col-span-4 justify-center border border-black my-8 mx-4 overflow-y-auto">
                        <div className="flex flex-col items-center w-full">
                            <h1 className="text-xl py-6">Scheduled Photoshoots</h1>
                            <span className="border-b border-black w-full"/>
                            <div className="w-full h-full bg-gray-100 overflow-y-auto">
                                {photoshoots !== null ?
                                    photoshoots.map((photoshoot) => {
                                        return (
                                            <Photoshoot 
                                                key={photoshoot.id}
                                                size="small"
                                                {...photoshoot}
                                            />
                                        );
                                    })
                                    : 
                                    null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}