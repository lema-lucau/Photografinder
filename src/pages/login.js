import { useState, useContext, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from '../constants/routes'; 

export default function Login() {

    const handleLogin = async (event) => {
        event.preventDefault();
    }

    return(
        <div className="bg-sky-300 h-screen">
            <div className="container flex mx-auto p-10">
                <div className="flex w-2/5">
                    <img className="rounded" src="images\login_page_camera.jpg" />
                </div>
                <div className="flex flex-col w-3/5 items-center p-4 bg-white border border-gray-400 rounded">
                    <h1 className="text-4xl font-bold italic mt-36">Photografinder</h1>

                    {/* Form */}
                    <form className="flex flex-col items-center w-full" onSubmit={handleLogin} method="POST">
                        <input 
                            placeholder="Email"
                            type="text"
                            className="text-m w-5/6 bg-gray-200 border border-gray-500 rounded my-12 p-2"
                        />  
                        <input 
                            placeholder="Password"
                            type="password"
                            className="text-m w-5/6 bg-gray-200 border border-gray-500 rounded mb-12 p-2"
                        />  
                        <button
                            type="submit"
                            className="text-white bg-sky-300 mb-12 p-1 w-3/6"
                        >
                            Log In
                        </button>
                        <a href="#">Forgot your password? Click here</a>
                    </form>
                </div>
            </div>

            {/* Don't have an account */}
            <div className="container flex flex-col mx-auto items-center bg-white border border-gray-400 rounded p-4 w-4/5">
                <p>
                    Don't have an account?{` `}
                    <a className="font-bold text-blue-800" href="#"> Create an account</a>
                </p>
            </div>
        </div>
    );
}

