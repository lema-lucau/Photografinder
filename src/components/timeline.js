import Post from './post'

export default function Timeline() {
    return(
        <div className="h-screen overflow-y-auto pb-8">
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    );
}