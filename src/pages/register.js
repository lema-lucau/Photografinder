import { useState } from "react";
import FormInput from "../components/formInput";

export default function Register() {

    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    
    const handleRegistration = async (event) => {
        event.preventDefault();
        setDateOfBirth(event.target.elements.dateOfBirth.value); 
    }
    
    return(
        <div className="bg-sky-300 h-screen pb-[68rem]">
            <div className="container flex mx-auto p-10">
                <div className="flex flex-col bg-white w-full items-center border border-gray-400 rounded">
                    <h1 className="text-4xl font-bold italic mt-12">Photografinder</h1>
                    <h3 className="text-xl font-semibold mt-8 mb-12">Account Creation</h3>


                    {/* Form */}
                    <form className="flex flex-col w-full items-center" onSubmit={handleRegistration} method="POST">
                        <FormInput id="firstName" placeholder="First Name" type="text"/>
                        <FormInput id="lastName" placeholder="Last Name" type="text"/>
                        <FormInput id="email" placeholder="Email" type="text"/>
                        <FormInput id="password" placeholder="Password" type="password"/>
                        <FormInput id="confirmPassword" placeholder="Confirm Password" type="password"/>

                        <label 
                            htmlFor="dateOfBirth"
                            className="w-5/6 text-black text-xl font-medium mb-4"
                        >
                            Date of Birth
                        </label>
                        <input
                            id="dateOfBirth"
                            className="text-m w-5/6 bg-gray-200 border border-gray-500 rounded mb-12 p-2"
                            placeholder="Date of Birth"
                            type="date"
                        />

                        <div className="flex flex-row w-4/6 mx-auto">
                            <label 
                                className="flex flex-row w-1/6 text-black text-xl font-medium mb-4"
                            >
                                Register as a:
                            </label>
                            <input
                                className="ml-20 mt-2"
                                id="clientRadio"
                                placeholder="Date of Birth"
                                type="radio"
                                name="userType"
                                value="Client"
                            />
                            <label className="text-lg mx-4" htmlFor="clientRadio">Client</label>

                            <input
                                className="ml-36  mt-2"
                                id="photographerRadio"
                                placeholder="Date of Birth"
                                type="radio"
                                name="userType"
                                value="Photographer"
                            />
                            <label className="text-lg mx-4" htmlFor="PhotographerRadio">Photographer</label>
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