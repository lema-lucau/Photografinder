import Header from "../components/header";
import Sidebar from "../components/sidebar";
import UserProfile from "../components/userProfile";
import { LOGGED_IN_USER } from "../constants/user";

export default function Profile() {
    const firebaseUser = JSON.parse(localStorage.getItem(LOGGED_IN_USER));
    console.log(firebaseUser);

    return(
        <>
            <Header />
            <div className="flex flex-row bg-white">
                <Sidebar />
                <div className="w-full pt-12 px-12">
                    <UserProfile user=""/>
                </div>
            </div>
        </>
    );
}