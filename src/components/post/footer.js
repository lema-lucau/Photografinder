import { useState, useEffect } from "react";
import { addLikeToPost, removeLikeFromPost } from "../../services/posts";

export default function Footer({postId, postLikes, user}) {
    const [liked, setLiked] = useState(null);
    const [likes, setLikes] = useState(postLikes.length);

    useEffect(() => {
        // Check if user liked a post 
        if (postLikes.includes(user.uid)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [] );

    const clickedLike = async () => {
        setLiked(!liked);

        if (liked) {
            setLikes(likes - 1)
            await removeLikeFromPost(postId, user.uid);
        } else {
            setLikes(likes + 1)
            await addLikeToPost(postId, user.uid);
        }
    }

    return(
        <div className="flex flex-row border border-t-0 border-black rounded-b-3xl bg-gray-100">
            <div className="flex items-center mx-3 py-2">
                {liked !== null ? 
                    <>
                        <img className="w-14 h-14 object-cover cursor-pointer" onClick={clickedLike} src={liked ? "images/heart_filled.png" : "images/heart_outline.png"}/>
                        <p className="text-lg font-semibold pl-2">{likes === 1 ? `${likes} like` : `${likes} likes`}</p>
                    </>
                : null}
            </div>
        </div>
    );
}