export default function Icon({iconURL, text, alt}) {
    return(
        <div className="flex flex-col items-center cursor-pointer">
                <img src={iconURL} alt={alt}/>
                <p className="text-center pt-2">{text}</p>
        </div>
    );
}