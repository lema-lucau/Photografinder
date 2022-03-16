import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DASHBOARD, PHOTOSHOOTS } from "../../constants/routes";
import Icon from "./icon";
import { getUserByUserId } from "../../services/users";

export default function Sidebar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const firebaseUser = JSON.parse(localStorage.getItem("loggedInUser"));

        const getUser = async () => {
            const user = await getUserByUserId(firebaseUser.uid);
            setUser(user);
        }
        getUser();
    }, [])

    return(
        <div className="container flex flex-col justify-around items-center bg-white w-1/12 h-auto border border-r-black">
            <Link to={DASHBOARD}>
                <Icon iconURL="https://img.icons8.com/ios-filled/60/000000/home.png" text="Home" alt="home"/>
            </Link>

            <Icon iconURL="https://img.icons8.com/external-flatart-icons-outline-flatarticons/72/000000/external-map-real-estate-flatart-icons-outline-flatarticons.png" text="Nearby Photographers" alt="map"/>

            {user?.username ? 
                <Link to={`/p/${user.username}`}>
                    <Icon iconURL="https://img.icons8.com/ios/70/000000/name--v1.png" text="Profile" alt="profile"/>
                </Link>
                :
                null
            }

            <Link to={PHOTOSHOOTS}>
                <Icon iconURL="https://img.icons8.com/ios/70/000000/professional-photographer.png" text="Photoshoots" alt="photoshoots"/>
            </Link>
        </div>
    );
}