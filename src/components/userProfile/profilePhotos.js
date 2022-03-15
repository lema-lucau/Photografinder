export default function ProfilePhotos({user}) {
    return(
        <div className="grid grid-cols-3 gap-8 justify-items-center mt-4 py-4">
            <img className="object-cover w-96 h-96" src="https://picsum.photos/600/600" alt="img 1"/>
            <img className="object-cover w-96 h-96" src="https://picsum.photos/600/600" alt="img 2"/>
            <img className="object-cover w-96 h-96" src="https://picsum.photos/600/600" alt="img 3"/>

            <img className="object-cover w-96 h-96" src="https://picsum.photos/600/600" alt="img 4"/>
            <img className="object-cover w-96 h-96" src="https://picsum.photos/600/600" alt="img 5"/>
            <img className="object-cover w-96 h-96" src="https://picsum.photos/600/600" alt="img 6"/>

            <img className="object-cover w-96 h-96" src="https://picsum.photos/600/600" alt="img 7"/>
            <img className="object-cover w-96 h-96" src="https://picsum.photos/600/600" alt="img 8"/>
        </div>
    );
}