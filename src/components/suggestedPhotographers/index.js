import { Skeleton } from "@mantine/core";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DASHBOARD, PHOTOSHOOTS } from "../../constants/routes";
import { getUserByUserId, getUserNotFollowingPhotographers } from "../../services/users";
import Header from "../header";
import Sidebar from "../sidebar";
import DisplayPhotographer from "./displayPhotographer";

export default function SuggestedPhotographers({user}) {
    const [photographers, setPhotographers] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    let shuffledPhotographers = [];

    useEffect(() => {        
        document.title = "Suggestions";

        const getUserDetails = async () => {
            const returnedUser = await getUserByUserId(user.uid);
            setUserDetails(returnedUser);
        }

        const getPhotographers = async () => {
            const returnedPhotographers = await getUserNotFollowingPhotographers(user.uid);

            // Shuffle list of photographers (Fisher-Yates algorithm)
            while (returnedPhotographers.length) {
                let index =  Math.floor(Math.random() * returnedPhotographers.length);
                let photographer = returnedPhotographers.splice(index, 1);

                shuffledPhotographers.push(photographer[0]);
            }

            setPhotographers(shuffledPhotographers);
        }

        getUserDetails();
        getPhotographers();
    }, [user])

    const PageIcon = ({url, text}) => {
        return(
            <div className="flex flex-col w-64 h-64 border border-black rounded-3xl hover:bg-gray-200 cursor-pointer">
                <p className="text-center font-semibold text-xl">{text}</p>
                <img className="w-4/5 h-4/5 mx-auto my-auto" src={url} alt={`${text} icon`}/>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="flex flex-row h-screen">
                <Sidebar />
                <div className="flex flex-col w-full mx-12 my-12 overflow-y-auto">
                    <h1 className="text-center text-3xl italic font-semibold mb-8">Suggested photographers to follow</h1>
                    {!user || !photographers ? (
                        <div className="grid grid-flow-row gap-8">
                            <Skeleton className="rounded-3xl" height={384} />
                            <Skeleton className="rounded-3xl" height={384} />
                        </div>
                    )
                    : user?.uid && photographers?.length > 0 ? 
                        photographers.map((photographer) => {
                            return <DisplayPhotographer key={photographer.uid} photographer={photographer} user={user}/>
                        })
                    :
                        <div>
                            {userDetails?.username ? 
                                <>
                                    <p className="text-center text-2xl">
                                        You have followed all the photographers on this website
                                    </p>

                                    <p className="text-center text-xl my-8">Check out some other pages:</p>
                                    <div className="grid grid-cols-3 gap-x-0 justify-items-center">
                                        <Link to={DASHBOARD}>
                                            <PageIcon url="https://img.icons8.com/color/344/home--v1.png" text="Home"/>
                                        </Link>


                                        <Link to={PHOTOSHOOTS}>
                                            <PageIcon url="https://img.icons8.com/color/344/professional-photographer.png" text="Photoshoots"/>
                                        </Link>

                                        <Link to={`/p/${userDetails.username}`}>
                                            <PageIcon url="https://img.icons8.com/color/344/group.png" text="Profile"/>
                                        </Link>
                                    </div>
                                </>
                            : null}
                        </div>
                    }

                </div>
            </div>
        </>
    );
}