/**

- This is The session Management (for an ongoing Session) for the treasure Hunt Mini game.

**WHAT IT CAN DO:**

    -Start a new Session using API commands.
    
    -Store the session's ID in local storage.
    
    -Identify an ongoing session when the page reloads.
    
    -Continue the Game using API commands.
*/

/**
- Imports from the API
*/


//Import from API

    import {

    startSession,

    fetchQuestion
    
    } from "./api.js";




/**
- Starts a new treasure Hunt Game. 
- Saves the Session ID using Local storage.
- Loads the First Question of that Specific Treasure Hunt Session.


**Parameters:**

- player (string) > The Players Name
- app (string) > Identifier
- treasureHuntId (string) > The ID of the Treasure Hunt

**Returns:**

- Nothing (void)

*/

    //start new session from API and save it in local storage

     export async function startNewSession(player,app,treasureHuntId) {
     
     const start = await startSession(player,app,treasureHuntId);
     
     const id = start.sessionId;

     let saveSession =localStorage.setItem("SessionId",JSON.stringify(id));
     
     loadNextQuestion(id);

     return id;
    }




    
/**
 - Saves the Session ID from Local storage for future use.



**Parameters:**

- Nothing



**Returns:**

- Session ID 

*/


/**

    //A function that saves the session ID and passes it using local storage
    
    export async function findAndSaveSessionId(){
    
    let saveSession = JSON.parse(localStorage.getItem("SessionId"));
    if(saveSession === null){
    
        console.log("No session ID was found!");
        return;
    }
    else {
    
        //Await to validate the session
        await fetchQuestion(saveSession);
    }
    
    return saveSession;
    }



*/








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


    //Every time window loads check if a session is present

    window.onload =async function reloadPage() {
    
    //Save it
    let loadSavedSession = JSON.parse(localStorage.getItem("SessionId"));
    
    //No session found throw error
    if (!loadSavedSession){
    
    console.log("Error no Session Id Found");
    }
    
    //Load the question
    else{
    
    const session = JSON.parse(loadSavedSession);
    await loadNextQuestion(session);
    }
    
    }
`

*/




/**

- Loads Next question for a Treasure Hunt Session ID using API commands.
  
- Throws an Error Message in Case no question Found.
  
- Checks if the all the questions have been answered and throws a message.




**Parameters:**

- id (string)  > The Session ID


**Returns:**

- Nothing (void)
  
*/

/**

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

*/



