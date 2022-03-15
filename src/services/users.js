import axios from 'axios';

const usersApi = axios.create({
    baseURL: "http://localhost:9999/users/"
});


//POST
export async function createNewUser(user) {
    const newUser = 
        await usersApi.post("add", user)
        .then(response => response.data);

    console.log(newUser);
    return newUser;
}

// DELETE
export async function deleteAUser(userId) {
    const deletedUser = 
        await usersApi.delete(`delete/${userId}`)
        .then(response => response.data);

    console.log(deletedUser);
    return deletedUser;
} 

// GET
export async function getUserByUsername(username) {
    const user = 
        await usersApi.get(`username/${username}`)
        .then(response => response.data);
        
    console.log(user);
    return(user);
}

export async function getUserByUserId(userId) {
    const user = 
        await usersApi.get(userId)
        .then(response => response.data);
        
    console.log(user);
    return(user);
}

export async function getUserType(userId) {
    const type = 
        await usersApi.get(`type/${userId}`)
        .then(response => response.data);
        
    console.log(type);
    return(type);
}

export async function getUsersFollowing(userId) {
    let users = await usersApi.get(`following/`, {
        params: {
            uid: userId
        }
    })
    .then(response => response.data);

    console.log(users);
    return(users);
}

export async function getUsersFollowers(userId) {
    let users = await usersApi.get(`followers/`, {
        params: {
            uid: userId
        }
    })
    .then(response => response.data);

    console.log(users);
    return(users);
} 

// PATCH
export async function updateUserDetails(user) {
    const updatedUser = 
        await usersApi.patch("update", user)
        .then(response => response.data);

    console.log(updatedUser);
    return updatedUser;
} 

export async function updateProfilePicUrl(userId, newUrl) {
    const updatedUser =
        await usersApi.patch("profile-picture", {
            uid: userId,
            profilePicUrl: newUrl})
        .then(response => response.data);

    console.log(updatedUser);
    return updatedUser;
} 

export async function followPhotographer(photographerId, userId) {
    const user = 
        await usersApi.patch(`follow/${photographerId}`, { uid: userId })
        .then(response => response.data);

    console.log(user);
    return user;
} 

export async function unfollowPhotographer(photographerId, userId) {
    const user = 
        await usersApi.patch(`unfollow/${photographerId}`, { uid: userId })
        .then(response => response.data);

    console.log(user);
    return user;
} 
