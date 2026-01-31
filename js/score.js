//import functions from different js files
import {
    findAndSaveSessionId,
    LoadNextQuestion
}from "./resumeSession.js";

//import functions
import {
    CheckAndDisplay
}from "./sessionEnd.js";

import {
    fetchScore,
} from "./api.js";

//use findAndSaveSessionId to save the sessionId using local storage
let sessionId = await findAndSaveSessionId();


export async function updateScore(sessionId){
    //if CheckAndDisplay function returns false
    let game_finished = await CheckAndDisplay(sessionId);
    if(!game_finished){
        //fetch score from API
        let score = await fetchScore(sessionId);
        //Display it
        console.log("score: ", score);
        //No actual displays yet only in the console log
        //
        //document.getElementById(" ").innerHTML = score;
        //call the next question
        await LoadNextQuestion(sessionId);
    }

}