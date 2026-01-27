/**

- This is The session Management(End Handling) for the treasure Hunt Mini game.

**WHAT IT CAN DO:**
-Check whether the game is finished or not
-If the hunt is finished it displays the score and the leaderboard.
-If session is unresponsive it means time expired and session ends.
-Allow the hunter to restart the game when it's finished.
*/

/**
- Imports from the API
  */


//Import from API
`import {
    startSession,
    fetchQuestion
} from "./api.js";`



/**
- Imports from resumeSession.js
  */


//Import from resumeSession
`
import{
findAndSaveSessionId,
LoadNextQuestion
}from "./resumeSession.js";
`



/**
- Saves Session ID using Local Storage.
- Defines a variable named flag to track progress.
- Calls CheckAndDisplay function and passes check and flag(as reference).
*/




//use function to save the session ID

`const check = await findAndSaveSessionId();
//game state
let flag = {
state: false
};
if(flag.state === false){
await CheckAndDisplay(check,flag);
}
`




/**
- Every time page Reloads.
- Conducts a check for an existing Session ID in local storage.
- Continues the treasure Hunt if a Session ID was found.



**Parameters:**

- None

**Returns:**

- Nothing (void)
  */


/**


`   //Every time window loads check if a session is present
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
`
*/




/**
- Checks whether the session is finished and displays the score.
- Shows Leaderboard using the API commands.
- Continues the Hunt if it's not finished.

**Parameters:**

- check > Session ID
- flag > game state


**Returns:**

- Nothing (void)


*/




/**

//Function that finds checks the state of the Session and displays score if finished

`export async function CheckAndDisplay(check, flag){
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
`

*/