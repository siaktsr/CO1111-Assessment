//Import from API
import {
    updateLocation,
}from "./api.js";

//import functions
import {
    CheckAndDisplay
}from "./sessionEnd.js";
import {updateScore} from "./score";

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

document.addEventListener("answer-submitted", () => {
    getLocation(sessionId);
})





function showPosition(position){
    //Get the latitude
    let lat = position.coords.latitude;
    //Get the longitude
    let long = position.coords.longitude;
    return {lat,long};
}



async function getLocation(sessionId){
    if(!navigator.geolocation){
        alert("Geolocation is not supported.Please switch to different browser.");
        return;
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
        //Get the position, longitude and latitude
        let pos = showPosition(position);

        try{
            let data = await updateLocation(sessionId, pos.lat, pos.long);
            console.log(data.message);
            document.getElementById("currentLocation").innerHTML = "Location : " + data.message;
        }
        catch(err){
            alert("Unknown error: " + err);
        }
    });



}

















// export async function locationUpdates(sessionId){
//
//     if(sessionId === null){
//         alert("No session found!");
//         return;
//     }
//     while (!await CheckAndDisplay(sessionId)) {
//         document.getElementById("currentLocation").innerText = "Location:" + setInterval(getLocation,120000);
//         console.log("Hunt still Active...");
//     }
// }
