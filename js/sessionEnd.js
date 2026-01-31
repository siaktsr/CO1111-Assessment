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


//Function that finds checks the state of the Session and displays score if finished
export async function checkAndDisplay(check){
try{
    let question = await fetchQuestion(check);
    if(question.completed){
        console.log("Session completed!");
        let final_score = await fetchScore(check);
        console.log("Final Score :" , final_score);
        let final_leaderboard = await fetchLeaderboard(check);
        console.log(final_leaderboard);
        return true;
        }
    else {
        console.log("Session is Ongoing");
        await LoadNextQuestion(check);
        return false;
    }
}
    catch (error){
     console.error(error);
    }

}

//check for restart
async function restart(check, flag){


}
