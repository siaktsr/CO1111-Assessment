//Import from API
import {
    updateLocation,
    sumbitAnswer
}from "./api.js";


//Import from resumeSession
import{
    findAndSaveSessionId
}from "./resumeSession.js";


function showPosition(position){
    //Get the latitude
    let lat = position.coords.latitude;
    //Get the longitude
    let long = position.coords.longitude;
    return {lat,long};
}

//alert if browser does not allow location track
function CheckLocation(){
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