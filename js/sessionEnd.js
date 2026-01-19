//Import from API
import {
    fetchQuestion,
    fetchScore,
    fetchLeaderboard,
}from "./api.js";

//Import from resumeSession.js
import{
    startNewSession,
    LoadNextQuestion
}from "./resumeSession.js";


//Use Start New session to save the sessionID
let check = startNewSession(player,app,treasureHuntID);
//Save sessionID so it exists in a variable

async function CheckAndDisplay(){
try{
    let question = await fetchQuestion(check);
    if(question.completed){
        console.log("Session completed!");
        let score = await fetchScore(check);
        console.log(score);
        fetchLeaderboard(check);
    }
    else{
        console.log("Session is Ongoing");
        LoadNextQuestion(check);
    }
}
    catch (error){
     console.error(error);
    }

}

