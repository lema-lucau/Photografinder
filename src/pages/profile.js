import Header from "../components/header";
import Sidebar from "../components/sidebar";
import UserProfile from "../components/userProfile";

export default function Profile({user}) {
    return(
        <>
            <Header />
            <div className="flex flex-row bg-white">
                <Sidebar />
                <div className="w-full pt-12 px-12">
                    <UserProfile user={user}/>
                </div>
            </div>
        </>
    );
}