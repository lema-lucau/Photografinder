import axios from 'axios';

const postsApi = axios.create({
    baseURL: "http://localhost:9999/posts/"
});

// POST
export async function uploadPost(post) {
    const newPost = 
        await postsApi.post("add", post)
        .then(response => response.data);

    console.log(newPost);
    return newPost;
}

// DELETE
export async function deletePost(postId) {
    const deletedPost = 
        await postsApi.delete(`delete/${postId}`)
        .then(response => response.data);

    console.log(deletedPost);
    return deletedPost;
}

// PATCH
export async function addLikeToPost(postId, userId) {
    const likedPost = 
        await postsApi.patch(`addLike/${postId}`, { uid: userId })
        .then(response => response.data);

    console.log(likedPost);
    return likedPost;
}

export async function removeLikeFromPost(postId, userId) {
    const unlikedPost = 
        await postsApi.patch(`removeLike/${postId}`, { uid: userId })
        .then(response => response.data);

    console.log(unlikedPost);
    return unlikedPost;
}

// GET
export async function getPostById(postId) {
    const post = 
        await postsApi.get(`retrieve/${postId}`)
        .then(response => response.data);

    console.log(post);
    return post;
}

export async function getAllPhotographerPosts(userId) {
    const posts = 
        await postsApi.get(`retrieve/photographer/${userId}`)
        .then(response => response.data);

    console.log(posts);
    return posts;
}

export async function getPostLikes(postId) {
    const likes = 
        await postsApi.get(`retrieveLikes/${postId}`)
        .then(response => response.data);

    console.log(likes);
    return likes;
}