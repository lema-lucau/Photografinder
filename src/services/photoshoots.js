import axios from 'axios';

const photoshootsApi = axios.create({
    baseURL: "https://photografinder.xyz/photoshoots/"
});

// POST
export async function createPhotoshoot(photoshootDetails) {
    const newPhotoshoot =
        await photoshootsApi.post("add", photoshootDetails)
        .then(response => response.data);

    return newPhotoshoot;
}

// DELETE
export async function deletePhotoshoot(photoshootId) {
    const deletedPhotoshoot =
        await photoshootsApi.delete(`delete/${photoshootId}`)
        .then(response => response.data);

    return deletedPhotoshoot;
}

// PUT
export async function amendPhotoshoot(photoshootId, photoshootDetails) {
    const amendedPhotoshoot =
        await photoshootsApi.put(`amend/${photoshootId}`, photoshootDetails)
        .then(response => response.data);

    return amendedPhotoshoot;
}

// PATCH
export async function updatePhotoshootStatus(photoshootId, newStatus) {
    const updatedPhotoshoot =
        await photoshootsApi.patch(`update-status/${photoshootId}`, { status: newStatus })
        .then(response => response.data);

    return updatedPhotoshoot;
}

// GET
export async function getPhotoshootById(photoshootId) {
    const photoshoot = 
        await photoshootsApi.get(`retrieve/${photoshootId}`)
        .then(response => response.data);

    return photoshoot;
}

export async function getUsersPhotoshoots(userId) {
    const photoshoots = 
        await photoshootsApi.get("retrieve", { 
            params: {
                uid: userId 
            }
        })
        .then(response => response.data);

    return photoshoots;
}

export async function getUserPhotoshootsByStatus(userId, status) {
    const photoshoots = 
        await photoshootsApi.get("retrieve/by-status", { 
            params: {
                uid: userId,
                status: status 
            }
        })
        .then(response => response.data);

    return photoshoots;
}

export async function getUserPhotoshootByDateStartTime(userId, date, startTime) {
    const photoshoot = 
        await photoshootsApi.get("retrieve/by-date-start-time", { 
            params: {
                uid: userId,
                date: date,
                startTime: startTime 
            }
        })
        .then(response => response.data);

    return photoshoot;
}