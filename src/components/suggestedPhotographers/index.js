import { useState, useEffect } from "react";
import { getUserNotFollowingPhotographers } from "../../services/users";
import Header from "../header";
import Sidebar from "../sidebar";
import DisplayPhotographer from "./displayPhotographer";

export default function SuggestedPhotographers({user}) {
    const [photographers, setPhotographers] = useState(null);

    useEffect(() => {        
        const getPhotographers = async () => {
            const returnedPhotographers = await getUserNotFollowingPhotographers(user.uid);
            setPhotographers(returnedPhotographers);
        }

        getPhotographers();
    }, [user])

    return (
        <>
            <Header />
            <div className="flex flex-row h-screen">
                <Sidebar />
                <div className="flex flex-col w-full mx-12 my-12 overflow-y-auto">
                    <h1 className="text-center text-2xl font-semibold mb-8">Here are some photographers that you do not follow</h1>
                    {user?.uid && photographers !== null ? 
                            photographers.map((photographer) => {
                                return <DisplayPhotographer key={photographer.uid} photographer={photographer} />
                            })
                    : null}
                </div>
            </div>
        </>
    );
}