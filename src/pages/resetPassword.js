import { sendPasswordResetEmail } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../constants/routes";
import { auth } from "../firebase-config";

export default function ResetPassword()  {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Reset password";
    })

    const handlePasswordReset = (event) => {
        event.preventDefault();

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setError("");
                setMessage(`Password reset email successfully sent to ${email}`);

                // Wait 3.5 seconds before redirecting user to Login page
                setTimeout(() => {
                    navigate(LOGIN)}
                , 3500);
            })
            .catch((error) => {
                setMessage("");

                // User friendly error messages
                if(error.code === "auth/user-not-found") {
                    setError("No user found with that email");
                } else if(error.code === "auth/invalid-email") {
                    setError("Invalid email");
                }
            });
    }

    return(
        <div className="bg-sky-300 h-screen overflow-y-auto">
            <div className="w-3/5 h-3/5 mx-auto mt-16 bg-white border border-black rounded-3xl">
                <h1 className="text-3xl text-center font-semibold my-12">Reset your password</h1>
                <form className="flex flex-col items-center" onSubmit={handlePasswordReset} method="POST">
                    <input 
                        id="email" placeholder="Email" type="text" onChange={(event) => setEmail(event.target.value)}
                        className="text-m w-5/6 bg-gray-200 border border-gray-400 rounded-2xl mb-8 p-2"
                    />

                    <p className="text-center text-red-500 pb-4">{`${error}`}</p>
                    <p className="text-center text-lg pb-4">{`${message}`}</p>

                    <button
                        type="submit"
                        className="text-white bg-sky-300 mt-4 p-2 w-3/6 rounded-full"
                    >
                        Send email
                    </button>
                </form>
            </div>
        </div>
    );
}