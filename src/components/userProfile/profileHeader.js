import { Modal } from "@mantine/core";
import { useState, useEffect } from "react";
import { LOGGED_IN_USER } from "../../constants/user";
import { getUserByUserId, followPhotographer, unfollowPhotographer } from "../../services/users";
import { getAllPhotographerPosts } from "../../services/posts";
import BookingForm from "../bookingForm";

export default function ProfileHeader({user}) {
    // States and variables
    let fbUser = JSON.parse(localStorage.getItem(LOGGED_IN_USER));
    const [loggedInUser, setLoggedInUser] = useState(null);

    const [numPhotos, setNumPhotos] = useState(null);
    
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        fbUser = JSON.parse(localStorage.getItem(LOGGED_IN_USER));

        const getUser = async () => {
            await getUserByUserId(fbUser.uid)
            .then(returnedUser => setLoggedInUser(returnedUser));
        }

        const getNumPhotos = async () => {
            await getAllPhotographerPosts(user.uid)
            .then(posts => setNumPhotos(posts.length));
        }

        getUser();
        getNumPhotos();
    }, [numPhotos]);

    // Functions
    const followAPhotographer = async (photographerId, userId) => {
        await followPhotographer(photographerId, userId);
        window.location.reload();
    }

    const unfollowAPhotographer = async (photographerId, userId) => {
        await unfollowPhotographer(photographerId, userId);
        window.location.reload();
    }

    // Components
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
        // Check if user follows photographer
        const userFollows = user.followers.some(element => element.uid === loggedInUser.uid);

        if (!userFollows) {
            return(
                <>
                    <button 
                        className="w-full text-center text-white text-lg bg-sky-300 border border-black p-1 mt-4"
                        onClick={() => followAPhotographer(user.uid, loggedInUser.uid)}
                    >
                        Follow
                    </button>
                </>
            );
        } else {
            return(
                <>
                    <button 
                        className="w-full text-center text-white text-lg bg-sky-300 border border-black p-1 mt-4"
                        onClick={() => unfollowAPhotographer(user.uid, loggedInUser.uid)}
                    >
                        Unfollow
                    </button>
                </>
            );
        }
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
            loggedInUser.type === "Photographer") {
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
            <div className="flex flex-col justify-around py-6">
                <p className="text-lg italic pt-2">{user.username}</p>
                <p className="font-bold pt-4">{`${user.firstName} ${user.lastName}`}</p>
                <p className="pt-4">{user.bio}</p>

                {user?.type === "Photographer" ?
                    <>
                        <p className="pt-4">
                        <span className="font-bold">Min rate: </span>
                        &euro;{user.minRate}/hr
                        </p>
                        <p className="pt-4">
                            <span className="font-bold">Location: </span>
                            {user.location}
                        </p>
                        <p className="pt-4">
                            <span className="font-bold">{numPhotos}</span> Photos,
                            <span className="font-bold"> {user.followers.length}</span> {user.followers.length === 1 ? 'Follower' : 'Followers'}
                        </p>
                    </>
                    : null
                }
            </div>
            {/* Profile picture and buttons */}
            <div className="flex flex-col items-end py-6">
                <div className="flex flex-col items-center">
                    <img className="w-44 h-44 object-cover rounded-full border-black" src="../images/default_user_icon.png" alt="users profile pic"/>
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