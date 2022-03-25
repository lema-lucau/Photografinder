import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LOGGED_IN_USER } from "../constants/user";
import { getUserByUserId, getUserByUsername } from "../services/users";
import { createPhotoshoot } from "../services/photoshoots";
import { v4 as uuidv4 } from "uuid";
import { PHOTOSHOOTS } from "../constants/routes";
import { concatTime, formatDate, isUserOccupied } from "../helpers/photoshootFunctions";

export default function BookingForm() {
    const {username} = useParams();
    const [profileUser, setProfileUser] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [photoshootsExists, setPhotoshootExists] = useState(null);

    // Form elements
    const [date, setDate] = useState(null);
    const [fromTime, setFromTime] = useState(null);
    const [toTime, setToTime] = useState(null);
    const [location, setLocation] = useState(null);
    const [clientNotes, setClientNotes] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fbUser = JSON.parse(localStorage.getItem(LOGGED_IN_USER));

        const getProfileUser = async () => {
            await getUserByUsername(username)
            .then(user => setProfileUser(user));
        }

        const getLoggedInUser = async () => {
            await getUserByUserId(fbUser.uid)
            .then(user => setLoggedInUser(user));
        }

        getProfileUser();
        getLoggedInUser();

    }, []);

    const handleBooking = async (event) => {
        event.preventDefault();

        let result = await isUserOccupied(profileUser.uid, date, fromTime, toTime);

        // If result photoshoot contains a photoshoot, the photographer is booked for that time
        // An error message will display
        if (result !== null && result.length !== 0) {
            setPhotoshootExists(result[0]);
            return;
        } else {
            setPhotoshootExists(null);
        }

        const photoshootDetails = {
            id: uuidv4(),
            photographerId: profileUser.uid,
            clientId: loggedInUser.uid,
            date: date,
            startTime: fromTime,
            endTime: toTime,
            location: location,
            clientNotes: clientNotes
        };

        await createPhotoshoot(photoshootDetails);

        // Redirect user to photoshoots page
        navigate(PHOTOSHOOTS);
    }

    return(
        <form onSubmit={handleBooking} method="POST" className="w-5/6 mx-auto px-24 py-10 border border-black rounded-2xl">
            <h1 className="text-lg flex justify-center">
                <span className="font-bold pr-4">Make a booking with:</span>{username}
            </h1>

            <div className="grid grid-cols-3 gap-0 mt-16">
                <label htmlFor="date" className="text-lg font-bold col-span-1">Date:</label>
                <input 
                    id="date" type="date" className="text-m w-full bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2"
                    onChange={(event) => setDate(event.target.value)}
                    required
                />

                <label htmlFor="fromTime" className="text-lg font-bold col-span-1">From:</label>
                <input 
                    id="fromTime" name="fromTime" type="time" step="900"
                    className="text-m bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2"
                    onChange={(event) => setFromTime(event.target.value)}
                    required
                />

                <label htmlFor="toTime" className="text-lg font-bold col-span-1">To:</label>
                <input 
                    id="toTime" name="toTime" type="time" step="900"
                    className="text-m bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2"
                    onChange={(event) => setToTime(event.target.value)}
                    required
                />

                <label htmlFor="location" className="text-lg font-bold col-span-1">Photoshoot Location:</label>
                <input 
                    id="location" placeholder="St. James Park, Dublin, X41 KS57" type="text" 
                    className="text-m w-full bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2"
                    onChange={(event) => setLocation(event.target.value)}
                    required
                />

                <label htmlFor="clientNotes" className="text-lg font-bold col-span-1">Client Notes:</label>
                <textarea 
                    id="clientNotes" placeholder="Enter any notes that you have for the photographer here..." rows="5" cols="50"
                    className="text-m bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2"
                    onChange={(event) => setClientNotes(event.target.value)}
                >
                </textarea>
            </div>

            {photoshootsExists?.id ? 
                <div className="text-center text-red-500 mb-4">
                    <p>Please select a different time or date.</p>
                    <p>
                        {username} is occupied on {formatDate(photoshootsExists.date, "/")} from {concatTime(photoshootsExists.startTime, photoshootsExists.endTime)}.
                    </p>
                </div>
                : null
            }

            <div className="flex justify-end">
                <button 
                    type="submit"
                    id="request" className="text-white px-12 py-2 bg-sky-400 rounded-lg"
                >
                    Request a photoshoot
                </button>
            </div>             
        </form>
    );
}