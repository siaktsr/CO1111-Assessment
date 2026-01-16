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
    await LoadNextQuestion(id);
}

//Every time window loads check if a session is present
window.onload =async function reloadPage() {
        //Save it
        let loadSavedSession = localStorage.getItem("SessionId");
        //No session found throw error
        if (!loadSavedSession){
            console.log("Error no Session Id Found");
        }
        //Load the question
        else{
            const session = JSON.parse(loadSavedSession);
            await LoadNextQuestion(session);
        }

}

//Function that loads the next question from API
export async function LoadNextQuestion(id) {
    try{
        //save question in variable
        let question = await fetchQuestion(id);
        //If no question found
        if (!question){
            console.error("Error fetching Question");
        }
        //If all questions are completed delete the Session From the local storage
        else if(question.completed){
            console.log("Congratulations Hunter! You completed the Treasure Hunt!");
            return;
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