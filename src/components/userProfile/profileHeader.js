export default function ProfileHeader({user}) {
    const isUsersProfile = false;
    const numPhotos = 8;
    const numFollowers = 168;
    const minRate = 75

    return(
        <div className="grid grid-cols-2 gap-4 border border-black px-12">
            {/* Profile info */}
            <div className="flex flex-col justify-between py-6">
                <p className="pt-2">Username</p>
                <p className="font-bold pt-4">Full Name</p>
                {/* Set character limit of 500  for about me section*/}
                <p className="pt-4">This section is about me. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pretium quis risus id rhoncus. Nullam tincidunt rhoncus lacus ut porttitor. Suspendisse tincidunt magna eget venenatis sodales. Integer feugiat quis elit quis tempus. Aliquam aliquet facilisis metus, consequat consectetur massa cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec id ligula luctus augue consequat facilisis. Etiam in magna congue, egestas ipsum.</p>
                <p className="pt-4">
                    <span className="font-bold">Min rate: </span>
                    &euro; {minRate}/hr
                </p>
                <p className="pt-4">
                    <span className="font-bold">{numPhotos}</span> Photos,
                    <span className="font-bold"> {numFollowers}</span> {numFollowers === 1 ? 'Follower' : 'Followers'}
                </p>
            </div>
            {/* Profile picture and buttons */}
            <div className="flex flex-col items-end py-6">
                <div className="flex flex-col items-center">
                    <img className="w-44 h-44 object-cover rounded-full border-black" src="images/default_user_icon.png" alt="users profile pic"/>
                    <a className="w-full text-center text-white text-lg bg-sky-300 border border-black p-1 mt-4" href="#">
                        { isUsersProfile ? 'Edit Profile' : 'Follow'}
                    </a>
                    <a className="w-full text-center text-white text-lg bg-sky-300 border border-black p-1 mt-4" href="#">
                        Book
                    </a>
                </div>
            </div>
        </div>
    );
}