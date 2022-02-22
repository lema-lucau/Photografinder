import Header from "../components/header";
import Photoshoot from "../components/photoshoot";
import Sidebar from "../components/sidebar";

export default function Photoshoots(){
    return(
        <>
            <Header />
            <div className="flex flex-row h-screen">
                <Sidebar />
                <div className="flex flex-col w-full m-12 border border-black rounded bg-gray-100">
                    <div className="flex justify-center w-full bg-white py-8">
                        <h1 className="text-2xl">Scheduled Photoshoots</h1>
                    </div>
                    <div className="">
                        <Photoshoot />
                        <Photoshoot />
                        <Photoshoot />
                        <Photoshoot />
                    </div>
                </div>
            </div>
        </>
    );
}