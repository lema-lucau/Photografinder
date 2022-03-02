import { useEffect, useState } from "react";
import { DB_CONN_STRING } from "../constants/mongoDBConn";
import { connectToDb } from "../libs/mongoDB";

export default function SetupProfile() {
    const [userType, setUserType] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");

    const [minRate, setMinRate] = useState("");
    const [location, setLocation] = useState("");

    const [dateOfBirth, setDateOfBirth] = useState(new Date());

    console.log(DB_CONN_STRING);
    connectToDb();

    const handleRegistration = async (event) => {
        event.preventDefault();

        if (userType === "Client") {
            setMinRate("");
            setLocation("");
        }

        console.log(userType, firstName, lastName, username, bio, minRate, location, dateOfBirth);
    }

    useEffect(() => {
        document.title = "Setup profile - Photografinder";
    }, []);
    
    return(
        <div className="bg-sky-300 h-screen overflow-y-auto">
            <div className="container flex mx-auto py-10 px-24">
                <div className="flex flex-col bg-white w-full items-center border border-gray-400 rounded">
                    <h1 className="text-4xl font-bold italic mt-12">Photografinder</h1>
                    <h3 className="text-xl font-semibold mt-8 mb-12">Account Creation</h3>

                    {/* Form */}
                    <form className="flex flex-col w-full items-center pb-4" onSubmit={handleRegistration} method="POST">
                        <div className="grid grid-flow-row grid-cols-12 gap-0 mx-auto w-4/6 mb-8">
                            <label 
                                className="col-span-3 text-black text-xl font-medium mb-4"
                            >
                                Register as a:
                            </label>
                            <input
                                className="mt-2 col-span-1"
                                id="clientRadio"
                                type="radio"
                                name="userType"
                                value="Client"
                                onChange={(event) => {setUserType(event.target.value); }}
                            />
                            <label className="col-span-3 text-lg" htmlFor="clientRadio">Client</label>

                            <input
                                className="mt-2 col-span-1"
                                id="photographerRadio"
                                type="radio"
                                name="userType"
                                value="Photographer"
                                onClick={(event) => setUserType(event.target.value)}
                            />
                            <label className="col-span-3 text-lg" htmlFor="photographerRadio">Photographer</label>
                        </div>

                        <input 
                            id="firstName" placeholder="First Name" type="text" onChange={(event) => setFirstName(event.target.value)}
                            className="text-m w-5/6 bg-gray-200 border border-gray-400 rounded mb-12 p-2"
                        />
                        <input 
                            id="lastName" placeholder="Last Name" type="text" onChange={(event) => setLastName(event.target.value)}
                            className="text-m w-5/6 bg-gray-200 border border-gray-400 rounded mb-12 p-2"
                        />
                        <input 
                            id="username" placeholder="Username" type="text" onChange={(event) => setUsername(event.target.value)}
                            className="text-m w-5/6 bg-gray-200 border border-gray-400 rounded mb-12 p-2"
                        />
                        <textarea 
                            id="bio" placeholder="Tell us a little about yourself..." rows="8" 
                            onChange={(event) => setBio(event.target.value)}
                            className="text-m bg-gray-200 border border-gray-400 rounded w-5/6 mb-12 p-2"
                        />

                        <label 
                            htmlFor="dateOfBirth"
                            className="w-5/6 text-black text-xl font-medium mb-4"
                        >
                            Date of Birth
                        </label>
                        <input 
                            id="dateOfBirth" placeholder="dd/mm/yyyy" type="date"
                            onChange={(event) => setDateOfBirth(event.target.value)}
                            className="text-m w-5/6 bg-gray-200 border border-gray-400 rounded mb-12 p-2"
                        />

                        {/* Choose which form to display  */}
                        <div className={userType === "Client" ? "hidden" : "flex flex-col w-full items-center"}>
                            <input 
                                id="minRate" placeholder="Minimum rate per hour (example: €150)" type="text" 
                                onChange={(event) => setMinRate(event.target.value)}
                                className="text-m w-5/6 bg-gray-200 border border-gray-400 rounded mb-12 p-2"
                            />
                            <input 
                                id="location" placeholder="Where you are based (example: SnapIt Studios, Dublin 18, Co. Dublin, A12 BC34)" type="text"
                                onChange={(event) => setLocation(event.target.value)}
                                className="text-m w-5/6 bg-gray-200 border border-gray-400 rounded mb-12 p-2"
                            />
                        </div>

                        <button
                            type="submit"
                            className="text-white bg-sky-300 mt-8 mb-12 p-2 w-3/6"
                        >
                            Create account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}