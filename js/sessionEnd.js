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
    let flag = false;
    let question = await fetchQuestion(check);
    if(question.completed){
        flag = true;
        console.log("Session completed!");
        let score = await fetchScore(check);
        console.log(score);
        await fetchLeaderboard(check);
    }
    else{
        console.log("Session is Ongoing");
        await LoadNextQuestion(check);
    }
}
    catch (error){
     console.error(error);
    }

}
