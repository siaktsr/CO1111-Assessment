//Import from API
import {
    updateLocation,
}from "./api.js";

//import functions
import {
    CheckAndDisplay
}from "./sessionEnd.js";

//Import from resumeSession
import{
    findAndSaveSessionId,
}from "./resumeSession.js";



await locationUpdates();




export function showPosition(position){
    //Get the latitude
    let lat = position.coords.latitude;
    //Get the longitude
    let long = position.coords.longitude;
    return {lat,long};
}

//alert if browser does not allow location track
export function CheckLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("Geolocation is not supported by this browser.");
    }
}

export async function getLocation(){
    //Get the position, longitude and latitude
    let position = position;
    let pos = showPosition(position);

    //Get the Session ID
    let sessionID = await findAndSaveSessionId();

try{
    let data = await updateLocation(sessionID, pos[0], pos[1]);
    console.log(data);
}
catch(err){
    alert("Unknown error: " + err);
}

}

export async function locationUpdates(){

    let sessionId = await findAndSaveSessionId();
    if(sessionId === null){
        alert("No session found!");
        return;
    }
    while (!await CheckAndDisplay(sessionId)) {
        setInterval(getLocation,120000);
        console.log("Hunt still Active...");
    }
}
