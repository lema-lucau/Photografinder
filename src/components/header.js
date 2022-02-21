import Logo from "./logo";

export default function Header() {
    return(
        <div className=" bg-white w-full">
            <div className="grid grid-rows-1 grid-flow-col items-center border border-b-black py-2 px-12">
                <Logo />
                <div className="container flex flex-row bg-gray-200 border border-gray-400 rounded my-2 p-2">
                    <img className="ml-1 gray-200" src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/24/000000/external-magnifying-glass-search-flatart-icons-outline-flatarticons-15.png" alt="magnifying glass"/>
                    <input 
                        id="search" 
                        placeholder="Search" 
                        type="text"
                        className="bg-gray-200 outline-none text-m w-11/12 px-2" 
                    />
                </div>
                <div className="flex justify-end items-center">
                    <img className="w-14 h-14 mx-2" src="https://img.icons8.com/ios/50/000000/home--v1.png" alt="home"/>
                    <img className="w-14 h-14 mx-8" src="https://img.icons8.com/external-prettycons-lineal-prettycons/96/000000/external-exit-essentials-prettycons-lineal-prettycons.png" alt="log out"/>
                    <img className="rounded-full w-24 h-24" src="https://via.placeholder.com/96" alt="users profile pic"/>
                </div>
            </div>
        </div>
    );
}