import FormInput from "./formInput";

export default function BookingForm({photographer}) {

    const handleBooking = async (event) => {
        event.preventDefault();
    }

    return(
        <div>
            <form onSubmit={handleBooking} method="POST" className="w-4/6 mt-16 mx-auto px-24 py-20 border border-black rounded-2xl">
                <div className="grid grid-cols-3 gap-0">
                    <label htmlFor="date" className="text-lg font-bold col-span-1">Date:</label>
                    <input 
                        id="date" type="date" className="text-m w-full bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2"
                    />

                    <label htmlFor="fromTime" className="text-lg font-bold col-span-1">From:</label>
                    <input 
                        id="fromTime" name="fromTime" type="time" value="09:00" step="900"
                        className="text-m bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2"
                    />

                    <label htmlFor="toTime" className="text-lg font-bold col-span-1">To:</label>
                    <input 
                        id="toTime" name="toTime" type="time" value="18:00" step="900"
                        className="text-m bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2"
                    />

                    <label htmlFor="location" className="text-lg font-bold col-span-1">Location:</label>
                    <input 
                        id="location" placeholder="St. James Park, Dublin, X41 KS57" type="text" 
                        className="text-m w-full bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2"
                    />

                    <label htmlFor="notes" className="text-lg font-bold col-span-1">Notes:</label>
                    <textarea 
                        id="notes" placeholder="Enter any notes that you have for the photographer here..." rows="5" cols="50"
                        className="text-m bg-gray-200 border border-gray-400 rounded mb-12 p-2 col-span-2"
                    >

                    </textarea>

                </div>
                
                <div className="flex justify-end">
                    <button id="cancel" className="text-white mx-8 px-12 py-2 border border-black bg-red-500 rounded-lg">Cancel</button>
                    <button id="confirm" className="text-white px-12 py-2 border border-black bg-sky-300 rounded-lg">Confirm booking</button>
                </div>
                
            </form>
        </div>
    );
}