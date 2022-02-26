import { useState } from "react";

export default function Footer() {
    const [toggleLiked, setToggleLiked] = useState(false);
    const [likes, setLikes] = useState(0);

    const clickedLike = () => {
        setToggleLiked(!toggleLiked);
        setLikes(toggleLiked ? likes - 1 : likes + 1);
    }

    return(
        <div className="flex flex-row border border-t-0 border-black rounded-b bg-gray-100">
            <div className="flex items-center mx-3 py-2">
                <img className="object-cover cursor-pointer" onClick={clickedLike} src={toggleLiked ? "images/heart_filled.png" : "images/heart_outline.png"}/>
                <p className="text-lg font-semibold pl-2">{likes === 1 ? `${likes} like` : `${likes} likes`}</p>
            </div>
        </div>
    );
}