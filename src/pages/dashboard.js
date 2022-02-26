import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Timeline from "../components/timeline";

export default function Dashboard() {
    return(
        <>
            <Header />
            <div className="flex flex-row h-screen">
                <Sidebar />
                <div className="grid grid-cols-10 gap-2 w-full">
                    <div className="flex col-span-6 justify-center  ml-8">
                        <div className="">
                            <Timeline />
                        </div>
                    </div>
                    <div className="flex col-span-4 justify-center border border-black my-8 mx-4">
                        This is for the scheduled photoshoots
                    </div>
                </div>
            </div>
        </>
    );
}