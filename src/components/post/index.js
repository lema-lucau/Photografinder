import { useState, useEffect } from "react";
import { getUserByUsername } from "../../services/users";
import Footer from "./footer";
import Header from "./header";

export default function Post({photo, user}) {
    const [profilePicUrl, setProfilePicUrl] = useState(null);
    
    useEffect(() => {
        let isMounted = true;

        const getUser = async () => {
            const user = await getUserByUsername(photo.ownerUsername);
            
            // Set state if component is mounted
            if (isMounted) {
                setProfilePicUrl(user.profilePicUrl);
            }   
        }

        getUser();

        return () => {
            isMounted = false;
        }
    });

    return(
        
        <div className="mt-12">
            {profilePicUrl !== null ? 
                <>
                    <Header username={photo.ownerUsername} profilePic={profilePicUrl}/>
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