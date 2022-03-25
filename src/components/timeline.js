import { useState, useEffect } from "react";
import { getAllPhotographerPosts } from "../services/posts";
import Post from './post';

export default function Timeline({user}) {
    const [photos, setPhotos] = useState(null);

    useEffect(() => {
        let following = [];
        let followingPhotos = [];

        const getPhotos = async () => {
            // Add all the photographers user follows into an array
            user.following.map((photographer) => {
                following.push(photographer.uid);
            });

            // Get the photos for each photographer that the user follows
            following.map( async (photographer) => {
                let photos = await getAllPhotographerPosts(photographer);
                followingPhotos.push(photos);
            });

            setPhotos(followingPhotos);
        }

        getPhotos();
    }, []);

    return(
        <div className="h-screen overflow-y-auto pb-8">
            {photos !== null ? 
                photos.map((photographerPhotos) => {
                    return photographerPhotos.map((photo) => {
                        return <Post key={photo.id} photo={photo} profilePic={photo.ownerProfilePicUrl}/>
                    })
                })
            : null}
        </div>
    );
}