import { Modal } from "@mantine/core";
import { useState, useEffect } from "react";
import { getAllPhotographerPosts } from "../../services/posts";

export default function ProfilePhotos({user}) {
    const [photos, setPhotos] = useState(null);
    const [opened, setOpened] = useState(false);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const getPhotos = async () => {
            await getAllPhotographerPosts(user.uid)
            .then(returnedPhotos => setPhotos(returnedPhotos));
        }

        getPhotos();
    }, [user]);

    return(
        <div className="grid grid-cols-3 gap-8 justify-items-center mt-4 py-4">
            <>
            {photos !== null ? 
                photos.map((photo) => { 
                    return (
                        <img 
                            key={photo.id} className="object-cover w-[450px] h-[450px] cursor-pointer hover:opacity-75" 
                            src={photo.imageUrl} alt={photo.imageName}
                            onClick={() => {setImage(photo); setOpened(true);}}
                        />
                    );
                })
            : null}
            </>

            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                centered={true}
                size="40%"
                padding="0px"
                styles={{
                    modal: { backgroundColor: 'rgba(0,0,0,0.0)' },
                    close: { color: 'black' }
                }}
            >
                {image?.imageUrl ? 
                    <div className="flex justify-center">
                        <img className="object-cover w-[600px] h-[600px]" src={image.imageUrl} alt={image.imageName}/>
                    </div>
                : null}
            </Modal>
        </div>
    );
}