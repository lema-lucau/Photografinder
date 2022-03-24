import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { amendPhotoshoot, getPhotoshootById } from "../services/photoshoots";
import { LOGGED_IN_USER } from "../constants/user";
import { getUserByUserId } from "../services/users";
import { PENDING } from "../constants/photoshoot";
import { PHOTOSHOOTS } from "../constants/routes";
import { formatDate, concatTime, isUserOccupied } from "../helpers/photoshootFunctions";

export default function EditPhotoshoot() {
    const {photoshootId} = useParams();
    const [photoshoot, setPhotoshoot] = useState(null);
    const [photoshootsExists, setPhotoshootExists] = useState(null);
    const [photographer, setPhotographer] = useState(null);
    const [client, setClient] = useState(null);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    // Form elements
    const [date, setDate] = useState(null);
    const [fromTime, setFromTime] = useState(null);
    const [toTime, setToTime] = useState(null);
    const [location, setLocation] = useState(null);
    const [clientNotes, setClientNotes] = useState("");
    const [photographerNotes, setPhotographerNotes] = useState("");

    useEffect(() => {
        const fbUser = JSON.parse(localStorage.getItem(LOGGED_IN_USER));

        const getPhotoshootClientAndPhotographer = async () => {
            const returnedPhotoshoot = await getPhotoshootById(photoshootId);
            setPhotoshoot(returnedPhotoshoot);

            // Set form elements states
            setDate(formatDate(returnedPhotoshoot.date, "-", "YYYYMMDD"));
            setFromTime(returnedPhotoshoot.startTime);
            setToTime(returnedPhotoshoot.endTime);
            setLocation(returnedPhotoshoot.location);
            setClientNotes(returnedPhotoshoot.clientNotes);
            setPhotographerNotes(returnedPhotoshoot.photographerNotes);

            // Get client and photographer
            await getUserByUserId(returnedPhotoshoot.photographerId)
            .then(returnedUser => setPhotographer(returnedUser));

            await getUserByUserId(returnedPhotoshoot.clientId)
            .then(returnedUser => setClient(returnedUser));
        }

        const getUser = async () => {
            await getUserByUserId(fbUser.uid)
            .then(returnedUser => setUser(returnedUser));
        }

        getPhotoshootClientAndPhotographer();
        getUser();
    }, [photoshootId]);

    async function updatePhotoshoot(event) {
        event.preventDefault();

        // Check if photographer booked
        const photographerResult = await isUserOccupied(photographer.uid, date, fromTime, toTime);
        const clientResult = await isUserOccupied(client.uid, date, fromTime, toTime);

        if (photographerResult !== null && photographerResult.length !== 0) {
            setPhotoshootExists(photographerResult[0]);
            return;
        } else {
            setPhotoshootExists(null);
        }

        // Check if client is booked

        if (clientResult !== null && clientResult.length !== 0) {
            setPhotoshootExists(clientResult[0]);
            return;
        } else {
            setPhotoshootExists(null);
        }

        let editedBy;
        if (user.uid === client.uid) {
            editedBy = "Client";
        } else if (user.uid === photographer.uid) {
            editedBy = "Photographer";
        }

        const updatedPhotoshoot = {
            status: PENDING,
            lastEditBy: editedBy,
            photographerId: photographer.uid,
            clientId: client.uid,
            date: date,
            startTime: fromTime,
            endTime: toTime,
            location: location,
            photographerNotes: photographerNotes,
            clientNotes: clientNotes
        }

        await amendPhotoshoot(photoshootId, updatedPhotoshoot);
        navigate(PHOTOSHOOTS);
    }

    return(
        <>
            <Header />
            <div className="flex flex-row h-screen">
                <Sidebar />
                {photoshoot !== null && user !== null && photographer !== null && client !== null ? 
                    <div className="flex w-full py-8">
                        <form onSubmit={updatePhotoshoot} method="POST" className="w-5/6 overflow-y-auto mx-auto px-24 py-10 border border-black rounded-2xl">
                            <p className="text-2xl flex justify-center pr-4">
                                <span className="font-bold pr-2">{client.username}</span>
                                & 
                                <span className="font-bold px-2">{photographer.username}'s</span>
                                photoshoot
                            </p>

                            <h1 className="text-xl flex justify-center mt-4">
                                <p className="font-bold pr-4">Edit details</p> 
                            </h1>

                            <div className="grid grid-cols-3 gap-0 mt-16">
                                <label htmlFor="date" className="text-lg font-bold col-span-1">Date:</label>
                                <input 
                                    id="date" type="date" className="text-m w-full bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2"
                                    defaultValue={formatDate(photoshoot.date, "-", "YYYYMMDD")}
                                    onChange={(event) => setDate(event.target.value)}
                                    required
                                />

                                <label htmlFor="fromTime" className="text-lg font-bold col-span-1">From:</label>
                                <input 
                                    id="fromTime" name="fromTime" type="time" step="900"
                                    defaultValue={photoshoot.startTime}
                                    className="text-m bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2"
                                    onChange={(event) => setFromTime(event.target.value)}
                                    required
                                />

                                <label htmlFor="toTime" className="text-lg font-bold col-span-1">To:</label>
                                <input 
                                    id="toTime" name="toTime" type="time" step="900"
                                    defaultValue={photoshoot.endTime}
                                    className="text-m bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2"
                                    onChange={(event) => setToTime(event.target.value)}
                                    required
                                />

                                <label htmlFor="location" className="text-lg font-bold col-span-1">Photoshoot Location:</label>
                                <input 
                                    id="location" placeholder="St. James Park, Dublin, X41 KS57" type="text" 
                                    defaultValue={photoshoot.location}
                                    className="text-m w-full bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2"
                                    onChange={(event) => setLocation(event.target.value)}
                                    required
                                />

                                <label htmlFor="clientNotes" className="text-lg font-bold col-span-1">Client Notes:</label>
                                <textarea 
                                    id="clientNotes" placeholder="Enter any notes that you have for the photographer here..." rows="5" cols="50"
                                    defaultValue={photoshoot.clientNotes}
                                    className={`text-m bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2 ${user.uid === client.uid ? '' : 'pointer-events-none'}`}
                                    onChange={(event) => setClientNotes(event.target.value)}
                                >
                                </textarea>

                                <label htmlFor="photographerNotes" className="text-lg font-bold col-span-1">Photographer Notes:</label>
                                <textarea 
                                    id="photographerNotes" placeholder="Enter any notes that you have for the client here..." rows="5" cols="50"
                                    defaultValue={photoshoot.photographerNotes}
                                    className={`text-m bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2 ${user.uid === photographer.uid ? '' : 'pointer-events-none'}`}
                                    onChange={(event) => setPhotographerNotes(event.target.value)}
                                >

                                </textarea>
                            </div>

                            {photoshootsExists?.id ? 
                                <div className="text-center text-red-500 mb-4">
                                    <p>Please select a different time or date.</p>
                                    <p>
                                        User is occupied on {formatDate(photoshootsExists.date, "/")} from {concatTime(photoshootsExists.startTime, photoshootsExists.endTime)}.
                                    </p>
                                </div>
                                : null
                            }

                            <div className="flex justify-end">
                                <button 
                                    type="submit"
                                    id="request" className="text-white px-12 py-2 bg-sky-400 rounded-lg"
                                >
                                    Amend photoshoot
                                </button>
                            </div>             
                        </form>
                    </div>    
                
                : <p>Photoshoot not found</p>}
            </div>
        </>
    );
}