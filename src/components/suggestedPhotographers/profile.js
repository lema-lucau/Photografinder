import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { followPhotographer, unfollowPhotographer } from "../../services/users";

export default function Profile({photographer, user}) {
    const [toggleFollow, setToggleFollow] = useState(false);
    let profilePicUrl;

    if (photographer.profilePicUrl === "") {
        profilePicUrl = "../images/default_user_icon.png";
    } else {
        profilePicUrl = photographer.profilePicUrl;
    }

    const navigate = useNavigate();

    const clickedFollow = async () => {
        setToggleFollow(!toggleFollow);

        if (toggleFollow) {
            await unfollowPhotographer(photographer.uid, user.uid);
        } else {
            await followPhotographer(photographer.uid, user.uid);
        }
    }

    return (
        <div className="flex flex-col w-full h-96 border-r border-black">
            <img 
                className="w-32 h-32 object-cover rounded-full mx-auto my-4 cursor-pointer" 
                src={profilePicUrl} alt={`${photographer.username}'s profile picture`}
                onClick={() => {navigate(`/p/${photographer.username}`)}}
            />

            <p className="font-semibold mx-auto mb-4">{photographer.firstName} {photographer.lastName}</p>
            <p className="italic mx-auto mb-4">{photographer.username}</p>
            <p className="text-center w-4/5 h-1/5 mx-auto mb-2 overflow-y-auto" >{photographer.bio === "" ? "No user bio" : photographer.bio}</p>
            <button 
                className="text-white text-lg mx-auto py-2 w-2/5 bg-sky-400 rounded-full"
                onClick={() => clickedFollow()}
            >
                {toggleFollow ? "Unfollow" : "Follow"}
            </button>
        </div>
    );
}