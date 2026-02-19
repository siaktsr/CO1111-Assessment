 import{
         fetchLeaderboard,
     }from"./api.js"


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

     console.log(leaderboardData);

     let display = document.getElementById("leaderboard");

     for (let i = 0; i < leaderboardData.leaderboard.length; i++) {
         let division = document.createElement("div");
         division.id = "entry";
         let numberDisplayed = i + 1;
         let show = numberDisplayed + " . " + leaderboardData.leaderboard[i].player + " - " + leaderboardData.leaderboard[i].score;
         division.textContent = show;
         display.appendChild(division);
     }
    // if(leaderboardData.leaderboard.  ){}
 }
//
await initLeaderboard();



