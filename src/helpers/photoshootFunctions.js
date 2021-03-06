import { COMPLETED, CONFIRMED, EXPIRED, PENDING } from "../constants/photoshoot";
import { getUserPhotoshootsByDateStatus, updatePhotoshootStatus } from "../services/photoshoots";

// Concatenate start and end time
export const concatTime = (startTime, endTime) => {return startTime + " - " + endTime};

// Return formatted date string
export const formatDate = (date, separator, format="DDMMYYYY") => {
    const day = date.substring(8, 10);
    const month = date.substring(5,7);
    const year = date.substring(0,4);

    if (format === "YYYYMMDD") {
        return year + separator + month + separator + day;
    }

    return day + separator + month + separator + year;
}

// Check if time is between
export async function isUserOccupied(uid, date, startTime, endTime) {
    const photoshoots = await getUserPhotoshootsByDateStatus(uid, date, CONFIRMED);
    const startTimeDate = new Date(`${date}T${startTime}`);
    const endTimeDate = new Date(`${date}T${endTime}`);
    
    // If the photoshoots array is not empty
    if (photoshoots.length !== 0) {
        return photoshoots.filter((photoshoot) => {
            let psStartTimeDate = new Date(`${date}T${photoshoot.startTime}`);
            let psEndTimeDate = new Date(`${date}T${photoshoot.endTime}`);
            
            // Check if the time the user selected in occupied
            // Return photoshoot data if slot is occupied
            return (
                (startTimeDate >= psStartTimeDate && startTimeDate <= psEndTimeDate) ||
                (endTimeDate >= psStartTimeDate && endTimeDate <= psEndTimeDate)
            );
          });
    } else {
        return null;
    }
}

// Check if photoshoot has finished OR expired
export const photoshootFinishedOrExpired = async (id, date, endTime, status) => {
    const today = new Date();
    const photoShootDate = new Date(`${date}T${endTime}`);

    if (today > photoShootDate && status === PENDING) {
        await updatePhotoshootStatus(id, EXPIRED);
    } else if (today > photoShootDate && status === CONFIRMED) {
        await updatePhotoshootStatus(id, COMPLETED);
    }
} 

export const isValidTime = (date, startTime, endTime) => {
    const startTimeDate = new Date(`${date}T${startTime}`);
    const endTimeDate = new Date(`${date}T${endTime}`);

    if (endTimeDate < startTimeDate) {
        return false;
    } else {
        return true;
    }
}