import Sidebar from "../components/sidebar";
import UserProfile from "../components/userProfile";

export default function Profile({user}) {
    return(
        <div className="flex flex-row bg-white">
            <Sidebar className="w-3/12"/>
            <div className="w-full pt-12 px-12">
                <UserProfile user={user}/>
            </div>
        </div>
    );
}