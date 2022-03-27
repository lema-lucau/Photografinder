import axios from 'axios';

const usersApi = axios.create({
    // baseURL: "https://photografinder.xyz/users/"
    baseURL: "http://localhost:9999/users/"
});


//POST
export async function createNewUser(user) {
    const newUser = 
        await usersApi.post("add", user)
        .then(response => response.data);

    return newUser;
}

export async function uploadProfilePic(formData) {
    const updatedUser =
        await usersApi.post("profile-picture", formData, 
        { headers: {"Content-Type": "multipart/form-data"} })
    .then(response => response.data);

    return updatedUser;
} 

// DELETE
export async function deleteAUser(userId) {
    const deletedUser = 
        await usersApi.delete(`delete/${userId}`)
        .then(response => response.data);

    return deletedUser;
} 

// GET
export async function getUserByUsername(username) {
    const user = 
        await usersApi.get(`username/${username}`)
        .then(response => response.data);
        
    return(user);
}

export async function getUserByUserId(userId) {
    const user = 
        await usersApi.get(userId)
        .then(response => response.data);
        
    return(user);
}

export async function getUsersFollowing(userId) {
    let users = await usersApi.get(`following/`, {
        params: {
            uid: userId
        }
    })
    .then(response => response.data);

    return(users);
}

export async function getUserNotFollowingPhotographers(userId) {
    let users = await usersApi.get(`not-following/`, {
        params: {
            uid: userId
        }
    })
    .then(response => response.data);

    return(users);
}

export async function getUsersFollowers(userId) {
    let users = await usersApi.get(`followers/`, {
        params: {
            uid: userId
        }
    })
    .then(response => response.data);

    return(users);
} 

// PATCH
export async function updateUserDetails(user) {
    const updatedUser = 
        await usersApi.patch("update", user)
        .then(response => response.data);

    return updatedUser;
} 

export async function followPhotographer(photographerId, userId) {
    const user = 
        await usersApi.patch(`follow/${photographerId}`, { uid: userId })
        .then(response => response.data);

    return user;
} 

export async function unfollowPhotographer(photographerId, userId) {
    const user = 
        await usersApi.patch(`unfollow/${photographerId}`, { uid: userId })
        .then(response => response.data);

    return user;
} 
