//Import from API
import {
    startSession,
    fetchQuestion
} from "./api.js";

//start new session from API and save it in local storage
export async function startNewSession(player,app,treasureHuntId) {
    const start = await startSession(player,app,treasureHuntId);
    const id = start.sessionId;
    let saveSession = localStorage.setItem("SessionId",JSON.stringify(id));
    await loadNextQuestion(id);
}

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

//On reload check
window.onload =async function reloadPage(sessionId) {

        //No session found throw error
        if (!sessionId) {
            console.log("Error no Session Id Found");
        }
        //Load the question
        else{
            await loadNextQuestion(sessionId);
        }
}

//Function that loads the next question from API
export async function loadNextQuestion(sessionId) {
    try{
        //Fetch Question from API
        let question = await fetchQuestion(sessionId);
        //If no question found
        if (!question){
            console.error("Error fetching Question");
        }
        //If all questions are completed display message
        else if(question.completed){
            console.log("Congratulations Hunter! You completed the Treasure Hunt!");
        }
        //Show the next question
        else{
            console.log(question);
            console.log(question.questionText);
        }
    }
    //Display Error
    catch (error) {
        console.error("Unknown Error");
    }
}
