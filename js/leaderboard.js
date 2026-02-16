import { fetchLeaderboard } from "./api.js";

const leaderboardBtn = document.getElementById("leaderboardBtn");
const leaderboardSection = document.getElementById("leaderboardSection");
const questionSection = document.getElementById("questionSection");
const leaderboardList = document.getElementById("leaderboardList");
const backBtn = document.getElementById("backBtn");
const answerInput = document.getElementById("answerInput");

let savedAnswer = "";
let currentSessionId;



leaderboardBtn.addEventListener("click", async function () {

    savedAnswer = answerInput.value;

    questionSection.style.display = "none";
    leaderboardSection.style.display = "block";

    leaderboardList.innerHTML = "Loading...";

    try {

        const data = await fetchLeaderboard({
            sessionId: currentSessionId,
            sorted: true
        });

        leaderboardList.innerHTML = "";

        data.leaderboard.forEach(player => {
            const li = document.createElement("li");
            li.textContent = player.player + " - " + player.score + " pts";
            leaderboardList.appendChild(li);
        });

    } catch (error) {
        leaderboardList.innerHTML = "Error loading leaderboard.";
        console.log(error.message);
    }
});



backBtn.addEventListener("click", function () {

    leaderboardSection.style.display = "none";
    questionSection.style.display = "block";

    answerInput.value = savedAnswer;
});
