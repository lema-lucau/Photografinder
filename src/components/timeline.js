import { useState, useEffect } from "react";
import { getAllPhotographerPosts } from "../services/posts";
import Post from './post';

export default function Timeline({user}) {
    const [photos, setPhotos] = useState(null);
    let sortedPhotos = [];

    useEffect(() => {
        let following = [];
        let followingPhotos = [];

        const getPhotos = async () => {
            // Add all the photographers user follows into an array
            for( const photographer of user.following ) {
                following.push(photographer.uid);
            }

            // Get the photos for each photographer that the user follows
            for( const photographer of following ) {
                let photos = await getAllPhotographerPosts(photographer);
                followingPhotos.push(photos);
            }

            setPhotos(followingPhotos);
        }

        getPhotos();
    }, []);

    const TimelinePhotos = () => {
        sortedPhotos = [];
        for( const photographerPhotos of photos ) {
            for( const photo of photographerPhotos ) {
                sortedPhotos.push(photo);
            }
        }

        // Sort array by timestamp
        sortedPhotos.sort(function (a,b) {
            return b.timestamp - a.timestamp
        });

        return sortedPhotos.map((photo) => {
            return <Post key={photo.id} photo={photo} />
        });
    }

    return(
        <div className="h-screen overflow-y-auto pb-8">
            {photos !== null ? 
                <TimelinePhotos />
            : null}
        </div>
    );
}