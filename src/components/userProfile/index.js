import ProfileHeader from "./profileHeader";
import ProfilePhotos from "./profilePhotos";

export default function UserProfile({user}) {
    return(
        <div className="flex flex-col mx-auto h-screen overflow-y-auto">
            <ProfileHeader user={user} />
            <ProfilePhotos user={user} />
        </div>
    );
}