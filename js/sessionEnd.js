//Import from API
import {
    fetchQuestion,
}from "./api.js";

//Import from resumeSession
import{
    findAndSaveSessionId,
}from "./resumeSession.js";

//use function to save the session ID
const sessionId = await findAndSaveSessionId();
 //game state

await CheckAndDisplay(sessionId);

//Function that finds checks the state of the Session and displays score if finished
export async function CheckAndDisplay(sessionId) {
    try{
        let question = await fetchQuestion(sessionId);
    if(question.completed){
        console.log("Session completed!");
        window.location.href = "test.html";
        return true;
        }
    else {
        console.log("Session is Ongoing !");
        return false;
    }
}
    catch (error){
     console.error(error);
    }

}

//check for restart
async function restart(sessionId) {


}
