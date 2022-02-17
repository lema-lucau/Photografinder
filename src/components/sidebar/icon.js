export default function Icon({iconURL, text}) {
    return(
        <div className="flex flex-col items-center">
                <img src={iconURL}/>
                <p className="text-center pt-2">{text}</p>
        </div>
    );
}