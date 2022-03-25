import { useState } from "react";

export default function Footer({numLikes}) {
    const [toggleLiked, setToggleLiked] = useState(false);
    const [likes, setLikes] = useState(numLikes);

    const clickedLike = () => {
        setToggleLiked(!toggleLiked);
        setLikes(toggleLiked ? likes - 1 : likes + 1);
    }

    return(
        <div className="flex flex-row border border-t-0 border-black rounded-b-3xl bg-gray-100">
            <div className="flex items-center mx-3 py-2">
                <img className="w-14 h-14 object-cover cursor-pointer" onClick={clickedLike} src={toggleLiked ? "images/heart_filled.png" : "images/heart_outline.png"}/>
                <p className="text-lg font-semibold pl-2">{likes === 1 ? `${likes} like` : `${likes} likes`}</p>
            </div>
        </div>
    );
}