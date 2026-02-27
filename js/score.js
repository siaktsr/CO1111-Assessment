//import functions
     import {
        CheckAndDisplay
    } from "../js/sessionEnd.js";

import {
    fetchScore,
    fetchQuestion
} from "../js/api.js";


let sessionId = null;


// Initialization
init();

function init() {
    const StoredData = localStorage.getItem("treasureHuntSession");

    if (!StoredData) {
        alert("Session data not found.");
        window.location.href = "../test/test.html";
    }
    const sessionData = JSON.parse(StoredData);
    sessionId = sessionData.sessionId;
}

updateScore(sessionId);

document.addEventListener("answer-submitted", () => {
    updateScore(sessionId);
})


    export async function updateScore(sessionId) {

            //fetch score from API
            let score = await fetchScore(sessionId);
            document.getElementById("score").innerText = "Score: " + score.score;
    }
