//Needs to only work when the game starts so only the html page that the hunt takes place
if(window.location.pathname.includes("")) {
    //import functions from different js files
    import {
        findAndSaveSessionId,
    } from "/resumeSession.js";

//import functions
    import {
        CheckAndDisplay
    } from "/sessionEnd.js";

    import {
        fetchScore,
    } from "/api.js";

//use findAndSaveSessionId to save the sessionId using local storage
    let sessionId = await findAndSaveSessionId();
    if(sessionId === null) {
        console.error("No such sessionId");
    }
    else if(!await CheckAndDisplay(sessionId) ){
       await updateScore(sessionId);
    }

    export async function updateScore(sessionId) {
        //if CheckAndDisplay function returns false
        let game_finished = await CheckAndDisplay(sessionId);
        if (!game_finished) {
            //fetch score from API
            let score = await fetchScore(sessionId);
            //Display it
            console.log("score: ", score.score);
            //No actual displays yet only in the console log
            //use this inside the html to display
            //MUST HAVE THIS LINE INSIDE THE HTML TO PROPERLY DISPLAY THE SCORE
            //<div id="score">Score: 0</div>

            //document.getElementById(" ").innerText = "Score: " + score.score;
            //call the next question
        }

    }
}
