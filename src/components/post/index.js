import Footer from "./footer";
import Header from "./header";

export default function Post({photo}) {
    return(
        <div className="mt-12">
            <Header username={photo.ownerUsername} profilePic={photo.ownerProfilePicUrl}/>
            <img 
                className="object-cover w-[600px] h-[600px] border border-t-0 border-b-0 border-black" 
                src={photo.imageUrl} alt={photo.imageName}
            />
            <Footer numLikes={photo.likes.length}/>
        </div>
    );
}