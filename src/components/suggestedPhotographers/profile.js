import { useNavigate } from "react-router-dom";

export default function Profile({photographer}) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-full h-96 border-r border-black">
            <img 
                className="w-32 h-32 object-cover rounded-full mx-auto my-4 cursor-pointer" 
                src={photographer.profilePicUrl} alt={`${photographer.username}'s profile picture`}
                onClick={() => {navigate(`/p/${photographer.username}`)}}
            />

            <p className="font-semibold mx-auto mb-4">{photographer.firstName} {photographer.lastName}</p>
            <p className="italic mx-auto mb-4">{photographer.username}</p>
            <p className="w-4/5 h-1/5 mx-auto mb-2 overflow-y-auto" >{photographer.bio}</p>
            <button className="text-white text-lg mx-auto py-2 w-2/5 bg-sky-400 rounded-full">Follow</button>
        </div>
    );
}