//import from api
import{
         fetchLeaderboard,
     }from"./api.js"


let page = 0;
const playersInPage = 50;
let leaderboard = [];



function formatPage(){
    const display = document.getElementById('leaderboard');
    //clear
    display.innerHTML = "";
    const startPoint = page * playersInPage;
    const endPoint = startPoint + playersInPage;

    //get only 50 each time 
    const formatPlayers = leaderboard.slice(startPoint,endPoint);

    //display until the endPoint
    for(let i =startPoint; i<endPoint;i++){
        const card = createCard(i , leaderboard[i].player , leaderboard[i].score);
        display.appendChild(card);
    }
}



 function createCard(index , player , score ){
    const card = document.createElement("div");
    card.classList.add("entry");

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



 async function initLeaderboard() {

     const stored = localStorage.getItem("treasureHuntSession");

     if (!stored) {
         console.error("No session found!");
         return;
     }

     const parsedSession = JSON.parse(stored);

     const leaderboardData = await fetchLeaderboard({
         sessionId: parsedSession.sessionId,
         sorted : true
     });

     let display = document.getElementById("leaderboard");

    leaderboard = leaderboardData.leaderboard;
    formatPage();

    document.getElementById("previousPage").addEventListener("click", () =>{

        page--;
        formatPage();
        window.scrollTo(0, 0);

    })
     document.getElementById("nextPage").addEventListener("click", () =>{
         page++;
         formatPage();
         window.scrollTo(0, 0);
     })
 }
//
await initLeaderboard();



