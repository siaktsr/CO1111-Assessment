 import{
         fetchLeaderboard,
     }from"./api.js"




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

     for (let i = 0; i < leaderboardData.leaderboard.length; i++) {

        const card = createCard(i , leaderboardData.leaderboard[i].player , leaderboardData.leaderboard[i].score);
        display.appendChild(card);
     }

 }
//
await initLeaderboard();



