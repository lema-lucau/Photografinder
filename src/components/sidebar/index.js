import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DASHBOARD, PHOTOSHOOTS, SUGGEST_PHOTOGRAPHERS } from "../../constants/routes";
import Icon from "./icon";
import { getUserByUserId } from "../../services/users";
import { LOGGED_IN_USER } from "../../constants/user";

export default function Sidebar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const firebaseUser = JSON.parse(localStorage.getItem(LOGGED_IN_USER));

        const getUser = async () => {
            const user = await getUserByUserId(firebaseUser.uid);
            setUser(user);
        }
        getUser();
    }, [])

    return(
        <div className="container flex flex-col justify-around items-center bg-white w-1/12 h-auto border border-r-black">
            {user?.username ? 
                <>
            
                <Link to={SUGGEST_PHOTOGRAPHERS}>
                    <Icon iconURL="https://img.icons8.com/external-victoruler-outline-victoruler/96/external-suggestion-business-and-finance-victoruler-outline-victoruler.png" text="Suggested Photographers" alt="find photographers"/>
                </Link>

                <Link to={`/p/${user.username}`}>
                    <Icon iconURL="https://img.icons8.com/ios/70/000000/name--v1.png" text="Profile" alt="profile"/>
                </Link>
                </>
                :
                null
            }

            <Link to={PHOTOSHOOTS}>
                <Icon iconURL="https://img.icons8.com/ios/70/000000/professional-photographer.png" text="Photoshoots" alt="photoshoots"/>
            </Link>
        </div>
    );
}