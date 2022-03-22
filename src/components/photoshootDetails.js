export default function PhotoshootDetails({username, date, startTime, endTime, location, clientNotes, photographerNotes}) {
    return(
        <div className="flex flex-col w-5/6 mx-auto py-12 border border-black rounded-2xl">
            <h3 className="text-center text-2xl font-bold mb-8">Photoshoot with {username}</h3>
            <div className="grid grid-cols-3 gap-16 mx-auto mt-4">
                <p className="text-xl text-center font-bold col-span-1 pl-4">Date:</p>
                <p className="text-xl col-span-2 mx-auto pr-4">{date}</p>

                <p className="text-xl text-center font-bold col-span-1 pl-4">From:</p>
                <p className="text-xl text-center col-span-2 pr-4">{startTime}</p>

                <p className="text-xl text-center font-bold col-span-1 pl-4">To:</p>
                <p className="text-xl text-center col-span-2 pr-4">{endTime}</p>

                <p className="text-xl text-center font-bold col-span-1 pl-4">Location:</p>
                <p className="text-xl text-center col-span-2 pr-4">{location}</p>

                <p className="text-xl text-center font-bold col-span-1 pl-4">Client Notes:</p>
                <p className="text-xl text-center col-span-2 pr-4">{clientNotes}</p>

                <p className="text-xl text-center font-bold col-span-1 pl-4">Photographer Notes:</p>
                <p className="text-xl text-center col-span-2 pr-4">{photographerNotes}</p>

            </div>
        </div>
    );
}