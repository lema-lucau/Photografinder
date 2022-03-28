import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { DASHBOARD, LOGIN } from "../constants/routes";
import { LOGGED_IN_USER } from "../constants/user";
import { createNewUser, getUserByUserId, getUserByUsername, updateUserDetails } from "../services/users";

export default function EditProfile() {
    const {userId} = useParams();
    const [user, setUser] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");

    const [minRate, setMinRate] = useState("");
    const [location, setLocation] = useState("");

    const [error, setError] = useState("");

    let navigate = useNavigate();

    const handleUpdate = async (event) => {
        event.preventDefault();

        // Check if that username exists already and it is not the logged in user's username
        const checkUsername = await getUserByUsername(username);

        if(checkUsername !== null && checkUsername.uid !== user.uid) {
            setError("Username already exists");
            return;
        } else {
            setError("");
        }

        let updateUser = {
            uid: userId,
            firstName: firstName,
            lastName: lastName,
            username: username,
            bio: bio,
            location: location,
            minRate: minRate,
        };

        if (user.type === "Client") {
            delete updateUser.minRate;
            delete updateUser.location;
        }

        try {
            await updateUserDetails(updateUser);

            navigate(`/p/${username}`)
        } catch (error) {
            setError(error);
            return;
        }
    }

    useEffect(() => {
        document.title = "Edit profile";

        const fbUser = JSON.parse(localStorage.getItem(LOGGED_IN_USER));

        // Redirect user if they are not logged in
        if (fbUser === null) {
            navigate(LOGIN);
        } else if (fbUser.uid !== userId) {
            navigate(DASHBOARD);
        }

        const getUserDetails = async () => {
            //If a user has an account redirect them to the dashboard
            const returnedUser = await getUserByUserId(userId);
            setUser(returnedUser);
            setFirstName(returnedUser.firstName);
            setLastName(returnedUser.lastName);
            setUsername(returnedUser.username);
            setBio(returnedUser.bio);
            setLocation(returnedUser.location);
            setMinRate(returnedUser.minRate);
        }

        getUserDetails();
    }, []);
    
    return(
        <>
            <Header />
            {user?.type ? 
                <div className="flex flex-row bg-sky-300">
                    <Sidebar />
                    <div className="flex flex-col bg-white w-full mx-12 my-8 items-center border border-gray-400 rounded-3xl overflow-y-auto">
                        <h3 className="text-2xl font-semibold my-8">Edit account details</h3>
                        <p className="text-xl font-semibold mb-12 text-red-500">All fields marked with * are required </p>

                        {/* Form */}
                        <form className="flex flex-col w-full items-center pb-4" onSubmit={handleUpdate} method="POST">
                            <input 
                                id="firstName" placeholder="First Name*" type="text" onChange={(event) => setFirstName(event.target.value)}
                                defaultValue={firstName}
                                className="text-m w-5/6 bg-gray-200 border border-gray-400 rounded-2xl mb-12 p-2"
                                required
                            />
                            <input 
                                id="lastName" placeholder="Last Name*" type="text" onChange={(event) => setLastName(event.target.value)}
                                defaultValue={lastName}
                                className="text-m w-5/6 bg-gray-200 border border-gray-400 rounded-2xl mb-12 p-2"
                                required
                            />
                            <input 
                                id="username" placeholder="Username*" type="text" onChange={(event) => setUsername(event.target.value)}
                                defaultValue={username}
                                className="text-m w-5/6 bg-gray-200 border border-gray-400 rounded-2xl mb-12 p-2"
                                required
                            />
                            <textarea 
                                id="bio" placeholder="Tell us a little about yourself..." rows="8" 
                                onChange={(event) => setBio(event.target.value)}
                                defaultValue={bio}
                                className="text-m bg-gray-200 border border-gray-400 rounded-2xl w-5/6 mb-12 p-2"
                            />

                            {/* Choose which form to display  */}
                            <div className={user.type === "Client" ? "hidden" : "flex flex-col w-full items-center"}>
                                <input 
                                    id="minRate" placeholder="Minimum rate per hour (example: 150)" type="text" 
                                    onChange={(event) => setMinRate(event.target.value)}
                                    defaultValue={minRate}
                                    className="text-m w-5/6 bg-gray-200 border border-gray-400 rounded-2xl mb-12 p-2"
                                />
                                <input 
                                    id="location" placeholder="Where you are based (example: SnapIt Studios, Dublin 18, Co. Dublin, A12 BC34)" type="text"
                                    onChange={(event) => setLocation(event.target.value)}
                                    defaultValue={location}
                                    className="text-m w-5/6 bg-gray-200 border border-gray-400 rounded-2xl mb-12 p-2"
                                />
                            </div>

                            <p className="text-center text-red-500 pb-8">{error}</p>
                            <button
                                type="submit"
                                className="text-white text-lg bg-sky-300 mt-8 mb-12 p-3 w-2/6 rounded-full"
                            >
                                Update account
                            </button>
                        </form>
                    </div>
                </div>
            : null}
        </>
    );
}