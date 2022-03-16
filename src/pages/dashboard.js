import Header from "../components/header";
import Photoshoot from "../components/photoshoot";
import Sidebar from "../components/sidebar";
import Timeline from "../components/timeline";

export default function Dashboard() {
    return(
        <>
            <Header />
            <div className="flex flex-row h-screen">
                <Sidebar />
                <div className="grid grid-cols-10 gap-2 w-full">
                    <div className="flex col-span-6 justify-center border-r border-black ml-8">
                        <Timeline />
                    </div>
                    <div className="flex col-span-4 justify-center border border-black my-8 mx-8 overflow-y-auto">
                        <div className="flex flex-col items-center w-full">
                            <h1 className="text-xl py-6">Scheduled Photoshoots</h1>
                            <span className="border-b border-black w-full"/>
                            <div className="w-full h-full bg-gray-100 overflow-y-auto">
                                <Photoshoot size="small" date="02-02-2022" username="lema_photography" time="09:00 - 10:00"/>
                                <Photoshoot size="small" date="18-04-2022" username="johns_shots" time="13:30 - 15:00"/>
                                <Photoshoot size="small" date="27-08-2022" username="alice5391" time="16:00 - 18:00"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}