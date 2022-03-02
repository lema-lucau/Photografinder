import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SETUP_PROFILE } from "../constants/routes";
import { auth } from "../firebase-config";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const [error, setError] = useState("");

    let navigate = useNavigate();
    
    const handleRegistration = async (event) => {
        event.preventDefault();

        if (password === confirmedPassword) {
            setError("");
            
            try {
                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
                const uid = userCredentials.user.uid;
                
                localStorage.setItem("loggedInUser", JSON.stringify({"uid" : uid}));
                navigate(SETUP_PROFILE);
            } catch (error) {
                setError(error.message);
            }
        } else {
            setError("Passwords do not match");
        }
    }

    useEffect(() => {
        document.title = "Registration - Photografinder";
    });
    
    return(
        <div className="bg-sky-300 h-screen pb-[68rem]">
            <div className="container flex mx-auto py-10 px-24">
                <div className="flex flex-col bg-white w-full items-center border border-gray-400 rounded">
                    <h1 className="text-4xl font-bold italic mt-12">Photografinder</h1>
                    <h3 className="text-xl font-semibold mt-8 mb-12">Account Creation</h3>

                    {/* Form */}
                    <form className="flex flex-col w-full items-center" onSubmit={handleRegistration} method="POST">
                        <input 
                            id="email" placeholder="Email" type="text" 
                            onChange={(event) => setEmail(event.target.value)}
                            className="text-m w-5/6 bg-gray-200 border border-gray-400 rounded mb-12 p-2"
                        />
                        <input 
                            id="password" placeholder="Password" type="password" 
                            onChange={(event) => setPassword(event.target.value)}
                            className="text-m w-5/6 bg-gray-200 border border-gray-400 rounded mb-12 p-2"
                        />
                        <input 
                            id="confirmPassword" placeholder="Confirm Password" type="password" 
                            onChange={(event) => setConfirmedPassword(event.target.value)}
                            className="text-m w-5/6 bg-gray-200 border border-gray-400 rounded mb-12 p-2"
                        />
                        
                        <p className="text-center text-red-500 pb-8">{`${error}`}</p>

                        <button
                            type="submit"
                            className="text-white bg-sky-300 mt-8 mb-12 p-2 w-3/6"
                        >
                            {`Next >>`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}