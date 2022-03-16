import { useState, useEffect } from "react";
import Header from "../components/header";
import Photoshoot from "../components/photoshoot";
import Sidebar from "../components/sidebar";
import { getUserByUserId } from "../services/users"; 
import { getUserPhotoshootsByStatus } from "../services/photoshoots";
import { CONFIRMED, PENDING } from "../constants/photoshoot"

export default function Photoshoots() {
    const [scheduledPhotoshoots, setScheduledPhotoshoots] = useState(null);
    const [pendingPhotoshoots, setPendingPhotoshoots] = useState(null);

    useEffect(() => {
        const firebaseUser = JSON.parse(localStorage.getItem("loggedInUser"));
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
                    // If logged in user is a client display photgraphers name
                    await getUserByUserId(photoshoot.photographerId)
                    .then(data => photoshoot.username = data.username);
                }
            });

            setTimeout(() => {setScheduledPhotoshoots(photoshoots)}, 300)
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
                    // If logged in user is a client display photgraphers name
                    await getUserByUserId(photoshoot.photographerId)
                    .then(data => photoshoot.username = data.username);
                }
            });

            // Set timeout to make sure username is received
            setTimeout(() => {setPendingPhotoshoots(photoshoots)}, 300)
        }

        getUser();
        setTimeout(() => {
            getScheduledPhotoshoots();
            getPendingPhotoshoots();
        }, 300);
    }, []);

    const concatTime = (startTime, endTime) => {return startTime + " - " + endTime};
    const formatDate = (date) => {
        const day = date.substring(8, 10);
        const month = date.substring(5,7);
        const year = date.substring(0,4);

        return day + "/" + month + "/" + year;
    }


    return(
        <>
            <Header />
            <div className="flex flex-row h-screen">
                <Sidebar />
                <div className="w-full overflow-y-auto">
                    {/* Scheduled photoshoots */}
                    <div className="flex flex-col h-4/6 my-12 mx-12 border border-black rounded bg-gray-100">
                        <div className="flex justify-center bg-white border border-b-black py-8">
                            <h1 className="text-2xl">Scheduled Photoshoots</h1>
                        </div>
                        <div className="overflow-y-auto">
                            {scheduledPhotoshoots !== null ?
                                scheduledPhotoshoots.map((photoshoot) => {
                                    return(
                                        <Photoshoot 
                                            key={photoshoot.id}
                                            id={photoshoot.id}
                                            date={formatDate(photoshoot.date)}
                                            username={photoshoot.username}
                                            location={photoshoot.location}
                                            time={concatTime(photoshoot.startTime, photoshoot.endTime)}
                                        />
                                    );
                                })
                                : 
                                null
                            }
                        </div>
                    </div>

                    {/* Pending photoshoots */}
                    <div className="flex flex-col h-4/6 my-12 mx-12 border border-black rounded bg-gray-100">
                        <div className="flex justify-center w-full bg-white border border-b-black py-8">
                            <h1 className="text-2xl">Pending Photoshoots</h1>
                        </div>
                        <div className="overflow-y-auto">
                            {pendingPhotoshoots !== null ?
                                pendingPhotoshoots.map((photoshoot) => {
                                    return (
                                        <Photoshoot 
                                            key={photoshoot.id}
                                            id={photoshoot.id}
                                            date={formatDate(photoshoot.date)}
                                            username={photoshoot.username}
                                            location={photoshoot.location}
                                            time={concatTime(photoshoot.startTime, photoshoot.endTime)}
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