import axios from 'axios';

const postsApi = axios.create({
    baseURL: "https://photografinder.xyz/posts/"
});

// POST
export async function uploadPost(formData) {
    const newPost = 
        await postsApi.post("add", formData, 
            { headers: {"Content-Type": "multipart/form-data"} })
        .then(response => response.data);

    return newPost;
}

// DELETE
export async function deletePost(postId) {
    const deletedPost = 
        await postsApi.delete(`delete/${postId}`)
        .then(response => response.data);

    return deletedPost;
}

// PATCH
export async function addLikeToPost(postId, userId) {
    const likedPost = 
        await postsApi.patch(`addLike/${postId}`, { uid: userId })
        .then(response => response.data);

    return likedPost;
}

export async function removeLikeFromPost(postId, userId) {
    const unlikedPost = 
        await postsApi.patch(`removeLike/${postId}`, { uid: userId })
        .then(response => response.data);

    return unlikedPost;
}

// GET
export async function getPostById(postId) {
    const post = 
        await postsApi.get(`retrieve/${postId}`)
        .then(response => response.data);

    return post;
}

export async function getAllPhotographerPosts(userId) {
    const posts = 
        await postsApi.get(`retrieve/photographer/${userId}`)
        .then(response => response.data);

    return posts;
}

export async function getPostLikes(postId) {
    const likes = 
        await postsApi.get(`retrieveLikes/${postId}`)
        .then(response => response.data);

    return likes;
}