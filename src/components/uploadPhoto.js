import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { uploadPost } from "../services/posts";
import { getUserByUsername, uploadProfilePic } from "../services/users";
import { v4 as uuidv4 } from "uuid";

export default function UploadPhoto(type) {
    const {username} = useParams();
    const [image, setImage] = useState();
    const [user, setUser] = useState(null);
    const [uploading, setUploading] = useState("");

    useEffect(() => {
        const getUser = async () => {
            await getUserByUsername(username)
            .then(returnedUser => setUser(returnedUser));
        }

        getUser();
    }, []);

    // Preview file
    const previewFile = () => {
        const imagePreview = document.getElementById("imagePreview");
        const uploadedImage = document.querySelector("input[type=file]").files[0];

        const reader = new FileReader();
        reader.addEventListener("load", function () {
            imagePreview.src = reader.result;
        }, false);

        if (uploadedImage) {
            reader.readAsDataURL(uploadedImage);
        } else {
            imagePreview.src = "";
        }
    }
    

    const upload = async (event) => {
        event.preventDefault();
        
        setUploading("Uploading image. Please wait...");

        const formData = new FormData();
        formData.append("image", image);
        formData.append("id", uuidv4());
        formData.append("ownerId", user.uid);

        if (type.type === "post") {
            await uploadPost(formData);
        } else if (type.type === "profilePicture") {
            await uploadProfilePic(formData);
        }

        window.location.reload();
    }

    function UploadType() {
        if (type.type === "post") {
            return(
                <>
                    <h1 className="text-2xl italic font-bold mb-8">Upload photo</h1>
                    <p className="text-xl mb-8">Recommended minimum image resolution:
                        <span className="font-bold"> 600 x 600</span>
                    </p>
                </>
            );
        } else if (type.type == "profilePicture") {
            return(
                <>
                    <h1 className="text-2xl italic font-bold mb-8">Upload profile picture</h1>
                    <p className="text-xl mb-8">Recommended minimum image resolution:
                        <span className="font-bold"> 192 x 192</span>
                    </p>
                </>
            );
        } else { return <></>;}
    }

    return user?.uid ? (
        <div className="flex flex-col w-5/6 items-center mx-auto py-10 border border-black rounded-2xl">
            <UploadType />

            <p className="text-xl mb-8">Aspect ratio:
                <span className="font-bold"> 1:1</span>
            </p>

            <img id="imagePreview" src="" alt="Image preview" 
                className={type.type === "post" ? "w-[600px] h-[600px] mb-8" : "w-48 h-48 object-cover rounded-full border-black mb-8"}
            />

            <form onSubmit={upload}>
                <input
                    filename={image} 
                    onChange={event => { setImage(event.target.files[0]); previewFile(); } } 
                    type="file" 
                    accept="image/png, image/jpeg"
                    required
                />
                
                <button 
                    type="submit"
                    className="text-white px-12 py-2 ml-8 bg-sky-400 rounded-lg"
                >
                    Upload photo
                </button>
            </form>

            <p className="text-lg mt-8">{uploading}</p>
        </div>
    ) : null;
}