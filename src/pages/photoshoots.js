import { useState, useEffect } from "react";
import Header from "../components/header";
import Photoshoot from "../components/photoshoot";
import Sidebar from "../components/sidebar";
import { getUserByUserId } from "../services/users"; 
import { getUserPhotoshootsByStatus } from "../services/photoshoots";
import { CONFIRMED, PENDING } from "../constants/photoshoot"
import { LOGGED_IN_USER } from "../constants/user";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../constants/routes";

export default function Photoshoots() {
    const [scheduledPhotoshoots, setScheduledPhotoshoots] = useState(null);
    const [pendingPhotoshoots, setPendingPhotoshoots] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Photoshoots";

        const firebaseUser = JSON.parse(localStorage.getItem(LOGGED_IN_USER));
        
        // Redirect user if they are not logged in
        if (firebaseUser === null) {
            navigate(LOGIN);
        }

        let user;
        const getUser = async () => {
            user = await getUserByUserId(firebaseUser.uid);
        }

        const getScheduledPhotoshoots = async () => {
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

            setTimeout(() => {setScheduledPhotoshoots(photoshoots)}, 500)
        }

        const getPendingPhotoshoots = async () => {
            const photoshoots = await getUserPhotoshootsByStatus(firebaseUser.uid, PENDING);

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

            // Set timeout to make sure username is received
            setTimeout(() => {setPendingPhotoshoots(photoshoots)}, 500)
        }

        getUser();
        setTimeout(() => {
            getScheduledPhotoshoots();
            getPendingPhotoshoots();
        }, 300);
    }, []);

    return(
        <>
            <Header />
            <div className="flex flex-row h-screen">
                <Sidebar />
                <div className="w-full overflow-y-auto">
                    {/* Scheduled photoshoots */}
                    <div className="flex flex-col h-4/6 my-12 mx-12 rounded-3xl bg-sky-100">
                        <div className="flex flex-col justify-center bg-sky-100 rounded-3xl pt-8">
                            <h1 className="text-2xl text-center font-semibold italic mb-4">Scheduled Photoshoots</h1>
                            <span className="w-full border-b border-black mb-6"/>
                        </div>
                        <div className="overflow-y-auto">
                            {scheduledPhotoshoots !== null ?
                                scheduledPhotoshoots.map((photoshoot) => {
                                    return(
                                        <Photoshoot 
                                            key={photoshoot.id}
                                            {...photoshoot}
                                        />
                                    );
                                })
                                : 
                                null
                            }
                        </div>
                    </div>

                    {/* Pending photoshoots */}
                    <div className="flex flex-col h-4/6 my-12 mx-12 rounded-3xl bg-sky-100">
                        <div className="flex flex-col justify-center bg-sky-100 rounded-3xl pt-8">
                            <h1 className="text-2xl text-center font-semibold italic mb-4">Pending Photoshoots</h1>
                            <span className="w-full border-b border-black mb-6"/>
                        </div>
                        <div className="overflow-y-auto">
                            {pendingPhotoshoots !== null ?
                                pendingPhotoshoots.map((photoshoot) => {
                                    return (
                                        <Photoshoot 
                                            key={photoshoot.id}
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
        </>
    );
}