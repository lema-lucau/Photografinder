import { useState, useEffect } from "react";
import { getAllPhotographerPosts } from "../services/posts";
import Post from './post';

export default function Timeline({user}) {
    const [photos, setPhotos] = useState(null);
    const [numPhotos, setNumPhotos] = useState(0);
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
                if (photos.length === 0) {
                    continue;
                }
                
                followingPhotos.push(photos);
            }
            setPhotos(followingPhotos);
            setNumPhotos(followingPhotos.length);
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
            return <Post key={photo.id} photo={photo} user={user} />
        });
    }

    return(
        <div className="h-screen overflow-y-auto pb-8">
            { photos !== null && numPhotos !== 0? 
                <TimelinePhotos />
            : 
                <>
                    <p className="text-2xl text-center mt-12">No posts to display. </p>
                    <p className="text-2xl text-center mt-8">Follow a photographer with posts to view them here</p>
                </>
            }
        </div>
    );
}