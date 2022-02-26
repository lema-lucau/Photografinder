import Post from './post'

export default function Timeline() {
    return(
        <div className="h-screen overflow-y-auto">
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    );
}