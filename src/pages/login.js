import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase-config';
import { Link, useNavigate } from "react-router-dom"
import { DASHBOARD, REGISTER } from '../constants/routes';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [error, setError] = useState("");

    let navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);

            localStorage.setItem("loggedInUser", JSON.stringify({"uid": userCredentials.user.uid}));
            navigate(DASHBOARD, {replace: true});
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        }
    }

    useEffect(() => {
        document.title = "Login - Photografinder";
    }, []);

    return(
        <div className="bg-sky-300 h-screen pb-[64rem]">
            <div className="container flex mx-auto py-10 px-40">
                <div className="flex w-2/5">
                    <img className="rounded" src="images\login_page_camera.jpg" alt="camera"/>
                </div>
                <div className="flex flex-col w-3/5 items-center p-4 bg-white border border-gray-400 rounded">
                    <h1 className="text-4xl font-bold italic mt-36">Photografinder</h1>

                    {/* Form */}
                    <form className="flex flex-col items-center w-full my-12" onSubmit={handleLogin} method="POST">
                        <input 
                            id="email" placeholder="Email" type="text" onChange={(event) => setEmail(event.target.value)}
                            className="text-m w-5/6 bg-gray-200 border border-gray-400 rounded mb-12 p-2"
                        />
                        
                        <input 
                            id="password" placeholder="Password" type="password" onChange={(event) => setPassword(event.target.value)}
                            className="text-m w-5/6 bg-gray-200 border border-gray-400 rounded mb-12 p-2"
                        />
                        
                        <p className="text-center text-red-500 pb-8">{`${error}`}</p>

                        <button
                            type="submit"
                            className="text-white bg-sky-300 rounded mb-12 p-2 w-3/6"
                        >
                            Log In
                        </button>
                        <a href="#">Forgot your password? Click here</a>
                    </form>
                </div>
            </div>

            {/* Don't have an account */}
            <div className="container flex flex-col mx-auto items-center bg-white border border-gray-400 rounded p-4 w-4/5">
                <Link to={REGISTER}>
                    Don't have an account?{` `}
                    <span className="font-bold text-blue-800"> Create an account</span>
                </Link>
            </div>
        </div>
    );
}

