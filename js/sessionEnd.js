//Import from API
import {
    fetchQuestion,
    fetchScore,
    fetchLeaderboard,
}from "./api.js";

//Import from resumeSession.js
import{
    findAndSaveSessionId,
    LoadNextQuestion
}from "./resumeSession.js";

//save session ID using local storage
let check = findAndSaveSessionId();

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
