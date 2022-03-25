import { Modal } from "@mantine/core";
import { useState, useEffect } from "react";
import { getAllPhotographerPosts } from "../../services/posts";

export default function ProfilePhotos({user}) {
    const [photos, setPhotos] = useState(null);
    const [opened, setOpened] = useState(false);
    const [imgUrl, setImgUrl] = useState("");

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
                photos.map((photo) => { 
                    return (
                        <img 
                            key={photo.id} className="object-cover w-[450px] h-[450px] cursor-pointer hover:opacity-75" 
                            src={photo.imageUrl} alt={photo.imageUrl}
                            onClick={() => {setImgUrl(photo.imageUrl); setOpened(true);}}
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
                <div className="flex justify-center">
                    <img className="object-cover w-[600px] h-[600px]" src={imgUrl} alt={imgUrl}/>
                </div>
            </Modal>
        </div>
    );
}