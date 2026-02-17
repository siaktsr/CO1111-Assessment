import {
    fetchTreasureHunts,
    startSession
} from "./api.js";

const gameSelect = document.getElementById("game-select");
const teamNameInput = document.getElementById("team-name");
const startButton = document.getElementById("start-game-btn");
const errorMessage = document.getElementById("error-message");

const APP_ID = "3RussiansAndMe" + "_v1.0";

async function loadTreasureHunts() {
    try {
        const hunts = await fetchTreasureHunts();

        gameSelect.innerHTML = '<option value="">Select a game</option>';

        hunts.forEach(hunt => {
            const option = document.createElement("option");
            option.value = hunt.uuid;
            option.textContent = hunt.name;
            option.dataset.questions = hunt.numOfQuestions;
            gameSelect.appendChild(option);
        });

        gameSelect.disabled = false;

    } catch (error) {
        errorMessage.textContent = error.message;
    }
}

gameSelect.addEventListener("change", () => {
    if (gameSelect.value) {
        teamNameInput.disabled = false;
        teamNameInput.focus();
    } else {
        teamNameInput.disabled = true;
        startButton.disabled = true;
    }
});

teamNameInput.addEventListener("input", () => {
    startButton.disabled = !teamNameInput.value.trim();
});

startButton.addEventListener("click", async () => {
    errorMessage.textContent = "";

    const player = teamNameInput.value.trim();
    const treasureHuntId = gameSelect.value;
    const selectedOption =
        gameSelect.options[gameSelect.selectedIndex];

    try {
        const session = await startSession(
            player,
            APP_ID,
            treasureHuntId
        );

        const treasureHuntSession = {
            player,
            app: APP_ID,
            treasureHuntId,
            sessionId: session.sessionId,
            numOfQuestions: Number(selectedOption.dataset.questions)
        };

        localStorage.setItem(
            "treasureHuntSession",
            JSON.stringify(treasureHuntSession)
        );

        window.location.href = "questions.html";

    } catch (error) {
        errorMessage.textContent = error.message;
    }
});

loadTreasureHunts();