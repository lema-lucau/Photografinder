import Header from "../components/header";
import Photoshoot from "../components/photoshoot";
import Sidebar from "../components/sidebar";

export default function Photoshoots() {
    return(
        <>
            <Header />
            <div className="flex flex-row h-screen">
                <Sidebar />
                <div className="w-full overflow-y-auto">
                    {/* Scheduled photoshoots */}
                    <div className="flex flex-col h-4/6 my-12 mx-12 border border-black rounded bg-gray-100">
                        <div className="flex justify-center bg-white border border-b-black py-8">
                            <h1 className="text-2xl">Scheduled Photoshoots</h1>
                        </div>
                        <div className="overflow-y-auto">
                            <Photoshoot />
                            <Photoshoot />
                            <Photoshoot />
                            <Photoshoot />
                        </div>
                    </div>

                    {/* Pending photoshoots */}
                    <div className="flex flex-col h-4/6 my-12 mx-12 border border-black rounded bg-gray-100">
                        <div className="flex justify-center w-full bg-white border border-b-black py-8">
                            <h1 className="text-2xl">Pending Photoshoots</h1>
                        </div>
                        <div className="overflow-y-auto">
                            <Photoshoot />
                            <Photoshoot />
                            <Photoshoot />
                            <Photoshoot />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}