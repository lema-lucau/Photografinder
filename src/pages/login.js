import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase-config';
import { Link, useNavigate } from "react-router-dom"
import { DASHBOARD, REGISTER, RESET_PASSWORD } from '../constants/routes';
import { LOGGED_IN_USER } from '../constants/user';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [error, setError] = useState("");

    let navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);

            localStorage.setItem(LOGGED_IN_USER, JSON.stringify(userCredentials.user));
            navigate(DASHBOARD);
        } catch (error) {
            // User friendly error messages
            if(error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                setError("Email or password is incorrect");
            } else if(error.code === "auth/invalid-email") {
                setError("Invalid email");
            } else {
                setError(error);
            }
        }
    }

    useEffect(() => {
        document.title = "Login";
    }, []);

    return(
        <div className="bg-sky-300 h-screen pb-[64rem]">
            <div className="container flex mx-auto py-10 px-40">
                <div className="flex w-2/5">
                    <img className="rounded" src="images\login_page_camera.jpg" alt="camera"/>
                </div>
                <div className="flex flex-col w-3/5 items-center p-4 bg-white border border-gray-400 rounded">
                    <div className="flex flex-row mt-36">
                        <img className="w-14 h-14" src="https://photografinder.s3.eu-west-1.amazonaws.com/logo512.png" alt="camera shutter"/>
                         <img className="w-14 h-14" src="https://img.icons8.com/ios-glyphs/1080/000000/vertical-line.png" alt="vertical line"/>
                        <h1 className="text-4xl font-bold italic mt-1">Photografinder</h1>
                    </div>

                    {/* Form */}
                    <form className="flex flex-col items-center w-full my-12" onSubmit={handleLogin} method="POST">
                        <input 
                            id="email" placeholder="Email" type="text" onChange={(event) => setEmail(event.target.value)}
                            className="text-m w-5/6 bg-gray-200 border border-gray-400 rounded-2xl mb-12 p-2"
                        />
                        
                        <input 
                            id="password" placeholder="Password" type="password" onChange={(event) => setPassword(event.target.value)}
                            className="text-m w-5/6 bg-gray-200 border border-gray-400 rounded-2xl mb-12 p-2"
                        />
                        
                        <p className="text-center text-red-500 pb-8">{`${error}`}</p>

                        <button
                            type="submit"
                            className="text-white bg-sky-300 rounded-full mb-12 p-2 w-3/6"
                        >
                            Log In
                        </button>
                        <Link to={RESET_PASSWORD}>
                            Forgot your password? {` `}
                            <span className="font-bold text-blue-800">Click here</span>
                        </Link>
                    </form>
                </div>
            </div>

            {/* Don't have an account */}
            <div className="container flex flex-col mx-auto items-center bg-white border border-gray-400 rounded-3xl p-4 w-4/5">
                <Link to={REGISTER}>
                    Don't have an account?{` `}
                    <span className="font-bold text-blue-800"> Create an account</span>
                </Link>
            </div>
        </div>
    );
}

