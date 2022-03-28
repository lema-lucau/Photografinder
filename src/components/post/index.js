import { useState, useEffect } from "react";
import { getUserByUserId } from "../../services/users";
import Footer from "./footer";
import Header from "./header";

export default function Post({photo, user}) {
    const [profilePicUrl, setProfilePicUrl] = useState(null);
    const [username, setUsername] = useState(null);
    
    useEffect(() => {
        let isMounted = true;

        const getUser = async () => {
            const user = await getUserByUserId(photo.ownerId);
            
            // Set state if component is mounted
            if (isMounted) {
                setProfilePicUrl(user.profilePicUrl);
                setUsername(user.username);
            }   
        }

        getUser();

        return () => {
            isMounted = false;
        }
    });

    return(
        
        <div className="mt-12">
            {profilePicUrl !== null && username !== null? 
                <>
                    <Header username={username} profilePic={profilePicUrl}/>
                    <img 
                        className="object-cover w-full h-[550px] border border-t-0 border-b-0 border-black" 
                        src={photo.imageUrl} alt={photo.imageName}
                    />
                    <Footer postId={photo.id} postLikes={photo.likes} user={user}/>
                </>
            : null}
        </div>
    );
}