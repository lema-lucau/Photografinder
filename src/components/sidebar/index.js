import Icon from "./icon";

export default function Sidebar() {
    return(
        <div className="container flex flex-col justify-around items-center bg-white w-1/12 h-auto border border-r-black">
            <Icon iconURL="https://img.icons8.com/ios-filled/60/000000/home.png" text="Home" alt="home"/>
            <Icon iconURL="https://img.icons8.com/external-flatart-icons-outline-flatarticons/72/000000/external-map-real-estate-flatart-icons-outline-flatarticons.png" text="Nearby Photographers" alt="map"/>
            <Icon iconURL="https://img.icons8.com/ios/70/000000/name--v1.png" text="Profile" alt="profile"/>
            <Icon iconURL="https://img.icons8.com/ios/70/000000/professional-photographer.png" text="Photoshoots" alt="photoshoots"/>
        </div>
    );
}