export default function Logo() {
    return(
        <div className="flex flex-row">
            <img className="w-12 h-12" src="https://photografinder.s3.eu-west-1.amazonaws.com/logo512.png" alt="camera shutter"/>
            <img src="https://img.icons8.com/ios-glyphs/30/000000/vertical-line.png" alt="vertical line"/>
            <h1 className="italic text-3xl font-semibold pt-1">Photografinder</h1>
        </div>
    );
}