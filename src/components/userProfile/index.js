import ProfileHeader from "./profileHeader";
import ProfilePhotos from "./profilePhotos";

export default function UserProfile({user}) {
    return(
        <div className="flex flex-col mx-auto h-screen overflow-y-auto">
            <ProfileHeader user={user} />
            {/* Only display images if the user is a photographer */}
            {user.type === "Photographer" ? <ProfilePhotos user={user} /> : null}
        </div>
    );
}