import Profile from "./profile";

export default function DisplayPhotographer({photographer}) {
    return (
        <div className="w-11/12 h-96 mb-8 flex flex-row border border-black rounded-3xl bg-sky-100">
            <div className="grid grid-cols-6 justify-items-around">
                <div className="col-span-2">
                    <Profile photographer={photographer} />
                </div>
                <img className="col-span-2 h-96" src={"https://picsum.photos/600/600"} />
                <img className="col-span-2 h-96" src={"https://picsum.photos/600/600"} />
            </div>
        </div>
    );
}