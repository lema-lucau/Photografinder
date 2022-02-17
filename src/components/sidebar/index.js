import Icon from "./icon";

export default function Sidebar() {
    return(
        <div className="container fixed flex flex-col justify-around items-center bg-white w-1/12 h-screen border border-r-black pt-28">
            <Icon iconURL="https://img.icons8.com/ios-filled/60/000000/home.png" text="Home"/>
            <Icon iconURL="https://img.icons8.com/external-flatart-icons-outline-flatarticons/72/000000/external-map-real-estate-flatart-icons-outline-flatarticons.png" text="Nearby Photographers"/>
            <Icon iconURL="https://img.icons8.com/ios/70/000000/name--v1.png" text="Profile"/>
            <Icon iconURL="https://img.icons8.com/ios/70/000000/professional-photographer.png" text="Photoshoots"/>
        </div>
    );
}