 import{
        fetchLeaderboard,
    }from"./api.js"


async function initLeaderboard() {

    const stored = localStorage.getItem("treasureHuntSession");

    if (!stored){ 
        console.error("No session found!");
        return;
    }

    const parsedSession = JSON.parse(stored);

    const leaderboardData = await fetchLeaderboard({
        sessionId: parsedSession.sessionId,
        sorted: true
    });

    console.log(leaderboardData);
}

initLeaderboard();
