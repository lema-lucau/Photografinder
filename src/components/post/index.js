import Footer from "./footer";
import Header from "./header";

export default function Post() {
    return(
        <div className="mt-12">
            <Header />
            <img className="object-cover w-[600px] h-[600px] border border-t-0 border-b-0 border-black" src="https://picsum.photos/600/600"/>
            <Footer />
        </div>
    );
}