export default function Header() {
    return(
        <div className="border border-black rounded-t bg-gray-100">
            <div className="flex flex-row mx-4 py-4">
                <a className="flex items-center" href="#">
                    <img className="object-cover rounded-full w-12 h-12" src="https://picsum.photos/500/500"/>
                    <p className="font-bold ml-2">Photographers_username</p>
                </a>
            </div>
        </div>
    );
}