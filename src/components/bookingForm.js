export default function BookingForm({photographer}, pending) {
    const username = "photographers_username";

    const isUserPhotographer = true;
    pending = true;

    const handleBooking = async (event) => {
        event.preventDefault();
    }

    function FormButtons() {
        if (!pending) {
            return(
                <div className="flex justify-end">
                    <button id="request" className="text-white px-12 py-2 bg-sky-400 rounded-lg">Request a photoshoot</button>
                </div> 
            );
        } else {
            return(
                <div className="flex justify-end">
                    <button id="amend" className="text-white px-12 py-2 bg-sky-400 rounded-lg">Amend</button>
                    <button id="decline" className="text-white px-12 py-2 ml-8 bg-red-500 rounded-lg">Decline</button>
                    <button id="accept" className="text-white px-12 py-2 ml-8 bg-green-400 rounded-lg">Accept</button>
                </div> 
            ); 
        }
    }

    return(
        <form onSubmit={handleBooking} method="POST" className="w-5/6 mx-auto px-24 py-10 border border-black rounded-2xl">
            <h1 className="text-lg flex justify-center">
                <span className="font-bold pr-4">Make a booking with:</span>{username}
            </h1>

            <div className="grid grid-cols-3 gap-0 mt-16">
                <label htmlFor="date" className="text-lg font-bold col-span-1">Date:</label>
                <input 
                    id="date" type="date" className="text-m w-full bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2"
                />

                <label htmlFor="fromTime" className="text-lg font-bold col-span-1">From:</label>
                <input 
                    id="fromTime" name="fromTime" type="time" step="900"
                    className="text-m bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2"
                />

                <label htmlFor="toTime" className="text-lg font-bold col-span-1">To:</label>
                <input 
                    id="toTime" name="toTime" type="time" step="900"
                    className="text-m bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2"
                />

                <label htmlFor="location" className="text-lg font-bold col-span-1">Photoshoot Location:</label>
                <input 
                    id="location" placeholder="St. James Park, Dublin, X41 KS57" type="text" 
                    className="text-m w-full bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2"
                />

                <label htmlFor="clientNotes" className="text-lg font-bold col-span-1">Client Notes:</label>
                <textarea 
                    id="clientNotes" placeholder="Enter any notes that you have for the photographer here..." rows="5" cols="50"
                    className={`text-m bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2 ${isUserPhotographer ? 'pointer-events-none' : ''}`}
                >
                </textarea>

                <label htmlFor="photographerNotes" className="text-lg font-bold col-span-1">Photographer Notes:</label>
                <textarea 
                    id="photographerNotes" placeholder="Enter any notes that you have for the client here..." rows="5" cols="50"
                    className={`text-m bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2 ${isUserPhotographer ? '' : 'pointer-events-none'}`}
                >
                </textarea>
            </div>
            
            <FormButtons />
        </form>
    );
}