//Import from API
import {
    fetchQuestion,
    fetchScore,
    fetchLeaderboard,
}from "./api.js";

//Import from resumeSession
import{
    findAndSaveSessionId,
    LoadNextQuestion
}from "./resumeSession.js";

//use function to save the session ID
const check = await findAndSaveSessionId();
 //game state
let flag = {
    state: false
};

if(flag.state === false){
    await CheckAndDisplay(check,flag);
}

//Function that finds checks the state of the Session and displays score if finished
export async function CheckAndDisplay(check, flag){
try{
    let question = await fetchQuestion(check);
    if(question.completed){
        console.log("Session completed!");
        let score = await fetchScore(check);
        console.log(score);
        await fetchLeaderboard(check);
        flag.state = true;
    }
    else {
        console.log("Session is Ongoing");
        await LoadNextQuestion(check);
        flag.state = false;
    }
}
    catch (error){
     console.error(error);
    }

}

//check for restart
async function restart(check, flag){


}
