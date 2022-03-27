export default function Icon({iconURL, text, alt}) {
    return(
        <div className="grid grid-cols-3 justify-items-center cursor-pointer pl-2 rounded-3xl hover:bg-sky-200">
                <img className="col-span-1 w-20 h-20" src={iconURL} alt={alt}/>
                <p className="col-span-2 text-center text-lg pt-6">{text}</p>
        </div>
    );
}