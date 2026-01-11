//Import from API
import {
    startSession,
    fetchQuestion
} from "./api.js";

//start new session from API and save it in local storage
async function startNewSession() {
    const start = await startSession(player , app , treasureHuntId);
    const ID = start.sessionId;
    let saveSession = localStorage.setItem("Session Id", ID);
    LoadNextQuestion(ID);
}

//Every time window loads check if a session is present
window.onload = function reloadPage() {
        //Save it
        const loadSavedSession = localStorage.getItem("Session Id");
        //No session found throw error
        if (!loadSavedSession)
            console.log("Error no Session Id Found");
        else
            //Load the question
            LoadNextQuestion(loadSavedSession);

}

//Function that loads the next question from API
async function LoadNextQuestion(ID) {
    try{
        //save question in variable
        let question = await fetchQuestion(ID);
        //If no question found
        if (!question)
            console.error("Error fetching Question");
        //If all questions are completed delete the Session From the local storage
        else if(question.completed){
            localStorage.removeItem("Session Id", ID);
            gameFinished();
            return;
        }
        //Show the next question
        else
            showQuestion(question);
    }
    //Display Error
    catch (error) {
        console.error("Unknown Error");
    }
}

//Show Finish message
function gameFinished() {
    console.log("Congratulations! , Treasure Hunt Completed! ");
}

//Display the next question from API
function showQuestion(q) {
    console.log(q);
    console.log(q,q.questionText);
}