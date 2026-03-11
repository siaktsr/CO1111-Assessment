//Import from API
import {
    updateLocation,
}from "./api.js";

let sessionId;
// Initialization
init();

function init() {
    const StoredData = localStorage.getItem("treasureHuntSession");

    if (!StoredData) {
        alert("Session ID was not found. Please try again.");
        window.location.href = "../test/test.html";
    }
    const sessionData = JSON.parse(StoredData);
    sessionId = sessionData.sessionId;
}

//Extract latitude and longitude from the geolocation position object
function showPosition(position){
    //Get the latitude
    let lat = position.coords.latitude;
    //Get the longitude
    let long = position.coords.longitude;
    return {lat,long};
}

/*
getLocation: asynchronously fetches the user's current GPS coordinates 
and sends them to the server via updateLocation.

Parameters:
- sessionId: the ID of the current game session

Returns:
- a Promise that resolves with the server response from updateLocation
*/
export async function getLocation(sessionId) {

    // Check if the browser supports geolocation
    if (!navigator.geolocation) {
        alert("Geolocation is not supported. Please switch to a different browser.");
        return;
    }

    // Wrap geolocation API in a Promise for async/await usage
    return new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition(async (position) => {

            // Extract latitude and longitude
            const pos = showPosition(position);

            try {
                // Send coordinates to the server
                const data = await updateLocation(sessionId, pos.lat, pos.long);
                // Resolve the promise with the server response
                resolve(data);
            } catch (error) {
                // Reject the promise if something goes wrong
                reject(error);
            }

        }, reject); // If geolocation fails, reject the promise
    });
}
