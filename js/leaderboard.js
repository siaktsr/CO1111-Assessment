//import from api
import{
    fetchLeaderboard,
}from "./api.js"


let page = 0;
const playersInPage = 50;
let leaderboard = [];
let weAsAPlayer;



function formatPage(){
    const display = document.getElementById('leaderboard');
    //clear
    display.innerHTML = "";
    const startPoint = page * playersInPage;
    const endPoint = Math.min(startPoint + playersInPage, leaderboard.length);

    //get only 50 each time 
    const formatPlayers = leaderboard.slice(startPoint,endPoint);

    //display until the endPoint
    for(let i =startPoint; i < endPoint; i++){
        const card = createCard(i , leaderboard[i].player , leaderboard[i].score);
        display.appendChild(card);
    }
}

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

async function initLeaderboard() {

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

    console.log(leaderboardData.leaderboard);
    let display = document.getElementById("leaderboard");

    leaderboard = leaderboardData.leaderboard;
    formatPage();
    renderCurrentPlayer();

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
//
await initLeaderboard();
