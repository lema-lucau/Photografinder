export default function Header({username, profilePic}) {
    if (profilePic === "") {
        profilePic = "../images/default_user_icon.png";
    }

    return(
        <div className="border border-black rounded-t-3xl bg-gray-100">
            <div className="flex flex-row mx-4 py-4">
                <a className="flex items-center" href={`/p/${username}`}>
                    <img className="object-cover rounded-full w-16 h-16" src={profilePic} alt={`${username}'s profile picture`}/>
                    <p className="text-lg font-semibold italic ml-2">{username}</p>
                </a>
            </div>
        </div>
    );
}