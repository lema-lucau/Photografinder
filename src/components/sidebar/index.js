import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DASHBOARD, PHOTOSHOOTS, SUGGEST_PHOTOGRAPHERS } from "../../constants/routes";
import Icon from "./icon";
import { getUserByUserId } from "../../services/users";
import { LOGGED_IN_USER } from "../../constants/user";
import { Skeleton } from "@mantine/core";

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
        <div className="container flex flex-col justify-evenly items-center bg-sky-100 w-2/12 h-auto">
            {user?.username ? 
                <>
            
                <Link to={SUGGEST_PHOTOGRAPHERS}>
                    <Icon iconURL="https://img.icons8.com/external-victoruler-linear-colour-victoruler/452/external-suggestion-business-and-finance-victoruler-linear-colour-victoruler.png" text="Suggested Photographers" alt="find photographers"/>
                </Link>

                <Link to={`/p/${user.username}`}>
                    <Icon iconURL="https://img.icons8.com/color/344/group.png" text="Profile" alt="profile"/>
                </Link>

                <Link to={PHOTOSHOOTS}>
                    <Icon iconURL="https://img.icons8.com/color/344/professional-photographer.png" text="Photoshoots" alt="photoshoots"/>
                </Link>
                </>
                :
                <>
                    <Skeleton className="rounded-3xl" height={80} />
                    <Skeleton className="rounded-3xl" height={80} />
                    <Skeleton className="rounded-3xl" height={80} />
                </>
            }
        </div>
    );
}