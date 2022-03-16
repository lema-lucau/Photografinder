import { Modal } from "@mantine/core";
import { useState, useEffect } from "react";
import { LOGGED_IN_USER } from "../../constants/user";
import { getUserByUserId } from "../../services/users";
import BookingForm from "../bookingForm";

export default function ProfileHeader({user}) {
    let fbUser = JSON.parse(localStorage.getItem(LOGGED_IN_USER));
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        fbUser = JSON.parse(localStorage.getItem(LOGGED_IN_USER));

        const getUser = async () => {
            await getUserByUserId(fbUser.uid)
            .then(returnedUser => setLoggedInUser(returnedUser));
        }

        getUser();
    }, []);

    const [opened, setOpened] = useState(false);

    const minRate = "00";
    const numFollowers = "00";
    const numPhotos = "00";

    const EditButton = () => {
        return(
            <>
                <button className="w-full text-center text-white text-lg bg-sky-300 border border-black p-1 mt-4">
                    Edit Profile
                </button>
            </>
        );
    }

    const FollowButton = () => {
        return(
            <>
                <button className="w-full text-center text-white text-lg bg-sky-300 border border-black p-1 mt-4">
                    Follow
                </button>
            </>
        );
    }

    const IsOwnProfile = () => {
        // User is logged in and a client
        if (user.uid === fbUser.uid && user.type === "Client") {
            return <EditButton />
        } else if(user.uid === fbUser.uid && user.type === "Photographer") {
            // User is logged in and photographer
            return(
                <>
                    <EditButton />
                    <button className="w-full text-center text-white text-lg bg-sky-300 border border-black p-1 mt-4">
                        Upload photo
                    </button>
                </>
            );
        } else { return <></>}
    }

    const ProfileButtons = () => {
        /* Not logged in user's profile, 
        logged in user is a photographer 
        and they are on another photographers page
        */
        if ( user.uid !== fbUser.uid && 
            user.type === "Photographer" && 
            loggedInUser.type == "Photographer") {
            return(
                <FollowButton />
            );
        } else if (user.uid !== fbUser.uid && user.type === "Photographer") {
            // Not logged in user's profile and they are on a photographers page
            return(
                <>
                    <FollowButton />
                    <button onClick={() => setOpened(true)} className="w-full text-center text-white text-lg bg-sky-300 border border-black p-1 mt-4">
                        Book
                    </button>
                </>
            );
        } 
        else { return <></>}
    }

    return(
        <div className="grid grid-cols-2 gap-4 border border-black px-12">
            {/* Profile info */}
            <div className="flex flex-col justify-center py-6">
                <p className="pt-2">Username</p>
                <p className="font-bold pt-4">Full Name</p>
                {/* Set character limit of 500  for about me section*/}
                <p className="pt-4">This section is about me. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pretium quis risus id rhoncus. Nullam tincidunt rhoncus lacus ut porttitor. Suspendisse tincidunt magna eget venenatis sodales. Integer feugiat quis elit quis tempus. Aliquam aliquet facilisis metus, consequat consectetur massa cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec id ligula luctus augue consequat facilisis. Etiam in magna congue, egestas ipsum.</p>
                <p className="pt-4">
                    <span className="font-bold">Min rate: </span>
                    &euro; {minRate}/hr
                </p>
                <p className="pt-4">
                    <span className="font-bold">Location: </span>
                    SnapIt Studios, Dublin 18, Co. Dublin, A12 BC34
                </p>
                <p className="pt-4">
                    <span className="font-bold">{numPhotos}</span> Photos,
                    <span className="font-bold"> {numFollowers}</span> {numFollowers === 1 ? 'Follower' : 'Followers'}
                </p>
            </div>
            {/* Profile picture and buttons */}
            <div className="flex flex-col items-end py-6">
                <div className="flex flex-col items-center">
                    <img className="w-44 h-44 object-cover rounded-full border-black" src="images/default_user_icon.png" alt="users profile pic"/>
                    {fbUser?.uid && loggedInUser?.uid ?
                        <>
                            <IsOwnProfile />
                            <ProfileButtons />
                        </>
                        :
                        null
                    }
                </div>
            </div>

            {/* Open modal to book photographer */}
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                size="80%"
            >
                <BookingForm />
            </Modal>
        </div>
    );
}