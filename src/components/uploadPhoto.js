import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { uploadPost } from "../services/posts";
import { getUserByUsername } from "../services/users";
import { v4 as uuidv4 } from "uuid";

export default function UploadPhoto() {
    const {username} = useParams();
    const [image, setImage] = useState();
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

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
        
        const formData = new FormData();
        formData.append("id", uuidv4());
        formData.append("ownerId", user.uid);
        formData.append("image", image);

        const result = await uploadPost(formData);

        console.log(result);
        window.location.reload();
    }

    return user?.uid ? (
        <div className="flex flex-col w-5/6 items-center mx-auto py-10 border border-black rounded-2xl">
            <p className="text-xl mb-8">Recommended minimum image resolution:
                <span className="font-bold"> 600 x 600</span>
            </p>
            <p className="text-xl mb-8">Aspect ratio:
                <span className="font-bold"> 1:1</span>
            </p>

            <img id="imagePreview" src="" className="w-[600px] h-[600px] mb-8" alt="Image preview"></img>


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
        </div>
    ) : null;
}