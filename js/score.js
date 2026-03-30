import {
    fetchScore,
} from "../js/api.js";

let sessionId = null;

// Initialization
init();

function init() {
    const StoredData = localStorage.getItem("treasureHuntSession");

    if (!StoredData) {
        alert("Session ID was not found. Please try again.");
        window.location.href = "../test/test.html";
    }
    const sessionData = JSON.parse(StoredData);
    sessionId = sessionData.sessionId;
}

// Initial score update when page loads
await updateScore(sessionId);

document.addEventListener("answer-submitted", () => {
    updateScore(sessionId);
})

// Function to fetch and update score on the page
export async function updateScore(sessionId) {

    //fetch score from API
    let score = await fetchScore(sessionId);
    document.getElementById("score").innerText ="Score : " + score.score;
}
