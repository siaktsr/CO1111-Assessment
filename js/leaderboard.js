if(window.location.pathname.includes("leaderboard.html")) {
    import{
        fetchLeaderboard,
    }from"./api.js"

    import{
        findAndSaveSessionId,
    }from "./resumeSession.js"

    let sessionId = await findAndSaveSessionId();
    if(sessionId === null){
        console.error("No session found!");
        return;
    }
    else{
        const leaderboardData = await fetchLeaderboard({sessionId : sessionId , sorted : true});
        let display = document.getElementById("leaderboard");

        for(let i =0;i < leaderboardData.leaderboard.length;i++){
            let division = document.createElement("div");
            let numberDisplayed = i +1;
            //let show = numberDisplayed + " . " + leaderboardData.leaderboard[i].player + " - " + leaderboardData.leaderboard[i].score;
            //division.textContent = show;
            //display.appendChild(division);
        }
    }
}

