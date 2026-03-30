//import from api
import{
    fetchLeaderboard,
}from "./api.js"

import { 
    showLoader, 
    hideLoader 
} from "../js/loader.js";

let page = 0;
const playersInPage = 50;
let leaderboard = [];
let weAsAPlayer;

// Renders the current page of leaderboard data
function formatPage(){
    const display = document.getElementById('leaderboard');
    //clear
    display.innerHTML = "";

    // Calculate current page range
    const startPoint = page * playersInPage;
    const endPoint = Math.min(startPoint + playersInPage, leaderboard.length);

    //get only 50 each time 
    const formatPlayers = leaderboard.slice(startPoint,endPoint);

    //display until the endPoint
    for(let i=startPoint; i < endPoint;i++){
        const card = createCard(i , leaderboard[i].player , leaderboard[i].score);
        display.appendChild(card);
    }
    const totalPages = Math.ceil(leaderboard.length / playersInPage);

    const prevBtn = document.getElementById("previousPage");
    const nextBtn = document.getElementById("nextPage");

    if (totalPages <= 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        return;
    }

    prevBtn.style.display = "inline-block";
    nextBtn.style.display = "inline-block";

    if (page === 0) prevBtn.style.display = "none";

    if (page === totalPages - 1) nextBtn.style.display = "none";

}

// Creates a single leaderboard entry (player card)
function createCard(index , player , score ){
    const card = document.createElement("div");
    card.classList.add("entry");

    if(player === weAsAPlayer){
        card.classList.add("outside-player");
    }

    const position = document.createElement("span");
    position.textContent = index + 1 + ".  ";

    const playerName = document.createElement("span");
    playerName.textContent = player ;

    const playerScore = document.createElement("span");
    playerScore.textContent = score;


    card.appendChild(position);
    card.appendChild(playerName);
    card.appendChild(playerScore);

    return card;
}

// Displays current player separately if they are not on the current page
function renderCurrentPlayer(){
    const playerContainer = document.getElementById("player");
    playerContainer.innerHTML = "";

    const playerIndex = leaderboard.findIndex(
        p => p.player === weAsAPlayer
    );

    if(playerIndex === -1){
        playerContainer.style.display = "none";
        return;
    }
    const startPoint = page * playersInPage;
    const endPoint = Math.min(startPoint + playersInPage, leaderboard.length);

    if(!(playerIndex >= startPoint && playerIndex <= endPoint)){
        const player = leaderboard[playerIndex];

        const card = createCard(
            playerIndex,
            player.player,
            player.score
        );
        playerContainer.style.display = "block";
        card.classList.add("outside-player");

        playerContainer.appendChild(card);
    }else{
        playerContainer.style.display = "none";
    }
}

// Main initialization function for leaderboard page
async function initLeaderboard() {
    
    const prevBtn = document.getElementById("previousPage");
    const nextBtn = document.getElementById("nextPage");
    const homeBtn = document.getElementById("homeButton");
    const questionBtn = document.getElementById("questionButton");
    
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    homeBtn.style.display = "none";
    questionBtn.style.display = "none";

    showLoader();

    try{
        const stored = localStorage.getItem("treasureHuntSession");

        if (!stored) {
            alert("No session ID found.Please Try Again.");
            return;
        }

        const parsedSession = JSON.parse(stored);

        weAsAPlayer = parsedSession.player;

        const leaderboardData = await fetchLeaderboard({
            sessionId: parsedSession.sessionId,
            sorted : true
        });

        let display = document.getElementById("leaderboard");

        leaderboard = leaderboardData.leaderboard;
        formatPage();
        renderCurrentPlayer();
    } catch (error) {
        alert(error.message);
    } finally {
        homeBtn.style.display = "inline-block";
        questionBtn.style.display = "inline-block";
        hideLoader();
    }

    document.getElementById("previousPage").addEventListener("click", () =>{

        if(page > 0){
            page--;
            formatPage();
            renderCurrentPlayer();
            window.scrollTo(0, 0);
        }

    })
    document.getElementById("nextPage").addEventListener("click", () =>{
        if(page < Math.ceil(leaderboard.length / playersInPage) - 1){
            page++;
            formatPage();
            renderCurrentPlayer();
            window.scrollTo(0, 0);
        }
     })
 }

await initLeaderboard();
