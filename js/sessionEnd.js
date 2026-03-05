//Import from API
import {
    fetchQuestion,
}from "./api.js";


//use function to save the session ID
// Initialization
init();
let sessionId;
function init() {
    const StoredData = localStorage.getItem("treasureHuntSession");

    if (!StoredData) {
        alert("Session data not found.");
        window.location.href = "../test/test.html";
    }
    const sessionData = JSON.parse(StoredData);
    sessionId = sessionData.sessionId;
}
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
