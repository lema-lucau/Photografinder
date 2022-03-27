import { useEffect, useState } from "react";
import { getPhotographerPosts } from "../../services/posts";
import Profile from "./profile";

export default function DisplayPhotographer({photographer, user}) {
    const [photos, setPhotos] = useState(null);

    useEffect(() => {
        const getPhotos = async () => {
            await getPhotographerPosts(photographer.uid, 2)
            .then(returnedPhotos => setPhotos(returnedPhotos));
        }

        getPhotos()
    }, []);

    return (
        <div className="w-full h-96 mb-8 flex flex-row border border-black rounded-3xl bg-sky-100">
            <div className="grid grid-cols-6 justify-items-around">
                <div className="col-span-2">
                    <Profile photographer={photographer} user={user}/>
                </div>
                {photos !== null ?
                    photos.map((photo) => {
                        return <img key={photo.id} className="col-span-2 h-[383px]" src={photo.imageUrl}/>
                    })
                : null}
            </div>
        </div>
    );
}