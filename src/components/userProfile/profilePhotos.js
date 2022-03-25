import { useState, useEffect } from "react";
import { getAllPhotographerPosts } from "../../services/posts";

export default function ProfilePhotos({user}) {
    const [photos, setPhotos] = useState(null);

    useEffect(() => {
        const getPhotos = async () => {
            await getAllPhotographerPosts(user.uid)
            .then(returnedPhotos => setPhotos(returnedPhotos));

        }

        getPhotos();
    }, []);

    return(
        <div className="grid grid-cols-3 gap-8 justify-items-center mt-4 py-4">
            <>
            {photos !== null ? 
                photos.map((photo) => { return <img key={photo.id} className="object-cover w-[450px] h-[450px]" src={photo.imageUrl} alt={photo.imageUrl}/>})
            : null}
            </>
        </div>
    );
}